/*********************************
Design by Jason.leung,
Email, jason.leung58@icloud.com
*********************************/
/* cited from  http://www.5icool.org */
window.onload=function()
{
	var dealy=3000;				
	var oBox=document.getElementById('box');
	var aList=document.getElementById('list');
	var aNum=document.getElementById('num').getElementsByTagName('li');
	var timer=null;
	var now=0;
	info();
	for (var i=0; i<aNum.length; i++)
	{
		aNum[i].index=i;
		aNum[i].onmouseover=function()
		{
			now=this.index;
			play(Running);
		}
	}
	function play(fn)
	{
		for (var i=0; i<aNum.length; i++)
		{
			aNum[i].className='';
		}
		aNum[now].className='active';
		fn(aList,{top:-170*now});			
	}
	function auto()
	{
		clearInterval(timer);
		timer=setInterval(function()
		{
			now++;
			if(now==aNum.length)
			{
				now=0;
			}
			play(Flexing);
		}, dealy);
	}
	auto();
	oBox.onmouseover=function()
	{
		clearInterval(timer);
	}
	oBox.onmouseout=function()
	{
		auto();
	}
}