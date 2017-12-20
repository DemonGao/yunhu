<template>
    <input type="file" style="display: none;" :id="'img-upload-'+ modelName" multiple accept="image/*" @change="uploadImg($event)"/>
</template>

<script>
    /* eslint-disable camelcase,indent */

    import EXIF from 'exif-js'

    export default {
        name: 'image-html5-upload',
        props: {
            modelName: {
                type: String,
                default: 'undefined'
            },
            imgNumLimit: {
                type: Number,
                default: 1
            }
        },
        components: {},
        computed: {},
        methods: {
            uploadImg(e) {
                let tag = e.target
                let fileList = tag.files
                let imgNum = fileList.length
                let _this = this
                let Orientation
                for (let i = 0; i < imgNum; i++) {
                    EXIF.getData(fileList[i], function () {
                        Orientation = EXIF.getTag(fileList[i], 'Orientation')
                    })
                    let reader = new FileReader()
                    reader.readAsDataURL(fileList[i])
                    reader.onload = function () {
                        let oReader = new FileReader()
                        oReader.onload = function (e) {
                            let image = new Image()
                            image.src = e.target.result
                            image.onload = function () {
                                let expectWidth = this.naturalWidth
                                let expectHeight = this.naturalHeight
                                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                                    expectWidth = 800
                                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth
                                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                                    expectHeight = 1200
                                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight
                                }
                                let canvas = document.createElement('canvas')
                                let ctx = canvas.getContext('2d')
                                canvas.width = expectWidth
                                canvas.height = expectHeight
                                ctx.drawImage(this, 0, 0, expectWidth, expectHeight)
                                let base64 = null
                                // 修复ios上传图片的时候 被旋转的问题
                                if (Orientation !== '' && Orientation !== 1) {
                                    switch (Orientation) {
                                        case 6:
                                            // 需要顺时针（向左）90度旋转
                                            _this.rotateImg(this, 'left', canvas)
                                            break
                                        case 8:
                                            // 需要逆时针（向右）90度旋转
                                            _this.rotateImg(this, 'right', canvas)
                                            break
                                        case 3:
                                            // 需要180度旋转
                                            _this.rotateImg(this, 'right', canvas)
                                            // 转两次
                                            _this.rotateImg(this, 'right', canvas)
                                            break
                                    }
                                }
                                base64 = canvas.toDataURL('image/jpeg', 0.8)
                                if (fileList[i].size / 1024000 > 1) {
                                    _this.imgScale(base64, 4)
                                } else {
                                    _this.$emit('changeImg', base64, _this.modelName)
                                }
                            }
                        }
                        oReader.readAsDataURL(fileList[i])
                    }
                }
            },
            imgScale(imgUrl, quality) {
                let img = new Image()
                let _this = this
                let canvas = document.createElement('canvas')
                let cxt = canvas.getContext('2d')
                img.src = imgUrl
                img.onload = function () {
                    // 缩放后图片的宽高
                    let width = img.naturalWidth / quality
                    let height = img.naturalHeight / quality
                    canvas.width = width
                    canvas.height = height
                    cxt.drawImage(this, 0, 0, width, height)
                    _this.$emit('changeImg', canvas.toDataURL('image/jpeg'), _this.modelName)
                }
            },
            rotateImg(img, direction, canvas) {
                // 图片旋转
                let min_step = 0
                let max_step = 3
                if (img === null) return
                let height = img.height
                let width = img.width
                let step = 2
                if (step === null) {
                    step = min_step
                }
                if (direction === 'right') {
                    step++
                    step > max_step && (step = min_step)
                } else {
                    step--
                    step < min_step && (step = max_step)
                }
                let degree = step * 90 * Math.PI / 180
                let ctx = canvas.getContext('2d')
                switch (step) {
                    case 0:
                        canvas.width = width
                        canvas.height = height
                        ctx.drawImage(img, 0, 0)
                        break
                    case 1:
                        canvas.width = height
                        canvas.height = width
                        ctx.rotate(degree)
                        ctx.drawImage(img, 0, -height)
                        break
                    case 2:
                        canvas.width = width
                        canvas.height = height
                        ctx.rotate(degree)
                        ctx.drawImage(img, -width, -height)
                        break
                    case 3:
                        canvas.width = height
                        canvas.height = width
                        ctx.rotate(degree)
                        ctx.drawImage(img, -width, 0)
                        break
                }
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped="scoped">
</style>
