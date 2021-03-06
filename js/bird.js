// 小鸟的构造函数
function Bird(option){
    this.ctx = option.ctx;
    this.birdImg = option.birdImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.birdW = option.birdImg.width / 3;
    this.birdH = this.birdImg.height;
    this.birdX = 0;
    this.birdY = 0;
    this.birdIndex = 0;
    this.birdSpeed = 0;
    this.g = 0.0003;
    this.birdMaxAngle = 45;
    this.birdMaxSpeed = 0.4;
}

Bird.prototype = {
    constructor : Bird,
    drawBird:function(offsetTime){
        // 重力加速度  var distanceY = 起始速度*时间 + g * 时间 * 时间 / 2
        // 单位时间间隔内小鸟移动的距离
        var distanceY = this.birdSpeed * offsetTime + this.g * offsetTime * offsetTime / 2;
        // 计算速度公式 var birdSpeed = 起始速度 +　g　*　时间
        // 速度是越来越快的， 所以需要加上前面的速度基线
        this.birdSpeed = this.birdSpeed + this.g * offsetTime;

        // 设置画布的Y坐标
        this.canvasY += distanceY;


        // 计算小鸟图像的X坐标
        this.birdX = this.birdIndex * this.birdW
        

        /*计算小鸟下落过程中的旋转的角度值*/
        var currentAngle = this.birdMaxAngle  / this.birdMaxSpeed * this.birdSpeed;
        if(currentAngle > 45){
            currentAngle = 45;
        }


        this.ctx.save();
        // 改变画布的原点
        this.ctx.translate(this.canvasX + this.birdW/2,this.canvasY + this.birdH/2);
        // 小鸟旋转
        this.ctx.rotate(Math.PI / 180 * currentAngle);
        // 绘制小鸟
        this.ctx.drawImage(this.birdImg,this.birdX,this.birdY,this.birdW,this.birdH,-this.birdW / 2,-this.birdH / 2,this.birdW,this.birdH);
        
        this.ctx.restore();

        this.birdIndex++;
        if(this.birdIndex > 2){
            this.birdIndex = 0;
        }

    }
}