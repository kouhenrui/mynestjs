import * as svgCaptcha from 'svg-captcha';
export async function getCaptcha() {
    //create生成字符验证码
    //createMathExpr生成计算数值验证码
  return  svgCaptcha.create({
      size: 4,//生成验证码长度
      fontSize: 36,//字符大小
      noise: 2,//干扰线条数
      width: 80,//图片宽度
      height: 28, //生成的图片高度
      color:true,//生成图片色彩度
      background: '#cc9966',//背景颜色
    //   charPreset: 'UTF8',//验证码字符集
  });
   
}
