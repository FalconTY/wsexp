/*
短单词
A set:["fee","ash","bet","ice","dig","same","lake","pick","nine","silk"]
B set:["let","map","air","fat","now","boat","half","know","idea","tell"]
短假词
A set: ["edd","fow","arl","kud","lyn","fuln","dirp","hyph","oush","huce"]
B set: ["roz","ull","voo","epe","gol","neln","saip","pess","fimb","plaf"]
长单词
A set: ["conference","regulation","compulsory","financial","encourage","eventually","foundation","recognize","government","agriculture"]
B set: ["occasional","optimistic","participate","challenge","dependent","scientific","experiment","establish","instruction","neighbor"]
长假词
A set: ["spruister","wrownidge","twinimalt","schreatch","philepace","drawnstern","billoargue","gnaupisity","triniscram","whaightact"]
B set: ["quoticate","froismast","phrealtor","lafoystic","illasphon","creathelat","ephlynicle","strifennet","froackable","slignotion"]


//not being used because all transformation was done in the iteminfo function; just here for illustration
var t_sw_A=transform(n_sw_A,1);
var t_sw_B=transform(n_sw_B,1);
var t_lw_A=transform(n_lw_A,1);
var t_lw_B=transform(n_lw_B,1);
var t_sn_A=transform(n_sn_A,1);
var t_sn_B=transform(n_sn_B,1);
var t_ln_A=transform(n_sn_A,1);
var t_ln_B=transform(n_sn_B,1);


*/


// practice blocks:
var n_sw_Ap=["tea"];
var n_sw_Bp=["frog"];
var n_sn_Ap=["oxl"];
var n_sn_Bp=["wze"];
var n_lw_Ap=["conference"];
var n_lw_Bp=["judgmental"];
var n_ln_Ap=["pmteston"];
var n_ln_Bp=["klerstion"];
var list_sw_Ap=iteminfo(n_sw_Ap, 3, "swAp_","Yes");   
var list_sw_Bp=iteminfo(n_sw_Bp, 3, "swBp_","Yes");
var list_lw_Ap=iteminfo(n_lw_Ap, 3, "lwAp_","Yes");
var list_lw_Bp=iteminfo(n_lw_Bp, 3, "lwBp_","Yes");
var list_sn_Ap=iteminfo(n_sn_Ap, 3, "snAp_","No");
var list_sn_Bp=iteminfo(n_sn_Bp, 3, "snBp_","No");
var list_ln_Ap=iteminfo(n_ln_Ap, 3, "lnAp_","No");
var list_ln_Bp=iteminfo(n_ln_Bp, 3, "lnBp_","No");
var pblock=materialversion(list_sw_Ap,list_lw_Ap,list_sw_Bp,list_lw_Bp,list_sn_Ap,list_ln_Ap,list_sn_Bp,list_ln_Bp);
pblock.versionname="practiceblock";


//exp blocks
var n_sw_A=["fee","ash","bet","ice","dig","same","lake","pick","nine","silk"];   //normal condition, short words
var n_sw_B=["let","map","air","fat","now","boat","half","know","idea","tell"];
var n_sn_A=["edd","fow","arl","kud","lyn","fuln","dirp","hyph","oush","huce"]; //normal condition, short nonwords
var n_sn_B=["roz","ull","voo","epe","gol","neln","saip","pess","fimb","plaf"];
var n_lw_A=["gathering","regulation","compulsory","financial","encourage","eventually","foundation","recognize","government","agriculture"]; //normal condition, long words
var n_lw_B=["occasional","optimistic","participate","challenge","dependent","scientific","experiment","establish","instruction","neighbor"];
var n_ln_A=["spruister","wrownidge","twinimalt","schreatch","philepace","drawnstern","billoargue","gnaupisity","triniscram","whaightact"]; //normal condition, long nonwords
var n_ln_B=["quoticate","froismast","phrealtor","lafoystic","illasphon","creathelat","ephlynicle","strifennet","froackable","slignotion"];


function transform(normalmaterials, variation)
{   var xx=[]; 
	for  (i=0;i<normalmaterials.length;i++)
	{	
		var temp1=printitem(normalmaterials[i],variation);
		xx.push(temp1); 
	} 
	return xx;
}


function iteminfo(itemarray,variation,id,c_response)
{   var items=[];

for (i=0; i<itemarray.length;i++)
	{
		items.push({});
		items[i].normal= itemarray[i];
		items[i].normalid= "N_"+id+(i+1); 
		items[i].normalc_response=c_response; 
		items[i].transform=printitem(itemarray[i], variation);  
		items[i].transformid= "T_"+id+(i+1); 
		items[i].transformc_response=c_response; 
	}
		return items;
}


var list_sw_A=iteminfo(n_sw_A, 3, "swA_","Yes");   
var list_sw_B=iteminfo(n_sw_B, 3, "swB_","Yes");
var list_lw_A=iteminfo(n_lw_A, 3, "lwA_","Yes");
var list_lw_B=iteminfo(n_lw_B, 3, "lwB_","Yes");
var list_sn_A=iteminfo(n_sn_A, 3, "snA_","No");
var list_sn_B=iteminfo(n_sn_B, 3, "snB_","No");
var list_ln_A=iteminfo(n_ln_A, 3, "lnA_","No");
var list_ln_B=iteminfo(n_ln_B, 3, "lnB_","No");

	function materialversion(nsw,nlw,tsw,tlw,nsn,nln,tsn,tln){
	var materials={
		itemlist:[],
		itemidlist:[],
		cresponselist:[]
	};
	
	for (i=0;i<nsw.length;i++)
	{
		materials.itemlist.push(nsw[i].normal);
		materials.itemidlist.push(nsw[i].normalid);
		materials.cresponselist.push(nsw[i].normalc_response);
	}
	for (i=0;i<nlw.length;i++)
	{
		materials.itemlist.push(nlw[i].normal);
		materials.itemidlist.push(nlw[i].normalid);
		materials.cresponselist.push(nlw[i].normalc_response);
	}
	for (i=0;i<tsw.length;i++)
	{
		materials.itemlist.push(tsw[i].transform);
		materials.itemidlist.push(tsw[i].transformid);
		materials.cresponselist.push(tsw[i].transformc_response);
	}
	for (i=0;i<tlw.length;i++)
	{
		materials.itemlist.push(tlw[i].transform);
		materials.itemidlist.push(tlw[i].transformid);
		materials.cresponselist.push(tlw[i].transformc_response);
	}
	
	
	for (i=0;i<nsn.length;i++)
	{
		materials.itemlist.push(nsn[i].normal);
		materials.itemidlist.push(nsn[i].normalid);
		materials.cresponselist.push(nsn[i].normalc_response);
	}
	for (i=0;i<nln.length;i++)
	{
		materials.itemlist.push(nln[i].normal);
		materials.itemidlist.push(nln[i].normalid);
		materials.cresponselist.push(nln[i].normalc_response);
	}
	for (i=0;i<tsn.length;i++)
	{
		materials.itemlist.push(tsn[i].transform);
		materials.itemidlist.push(tsn[i].transformid);
		materials.cresponselist.push(tsn[i].transformc_response);
	}
	for (i=0;i<tln.length;i++)
	{
		materials.itemlist.push(tln[i].transform);
		materials.itemidlist.push(tln[i].transformid);
		materials.cresponselist.push(tln[i].transformc_response);
	}
	
	return materials;
	}

//versions of exp test
var version1=materialversion(list_sw_A,list_lw_A,list_sw_B,list_lw_B,list_sn_A,list_ln_A,list_sn_B,list_ln_B);
version1.versionname="Version1";	
var version2=materialversion(list_sw_B,list_lw_B,list_sw_A,list_lw_A,list_sn_B,list_ln_B,list_sn_A,list_ln_A);
version2.versionname="Version2";



// this is to be used for generating materials for exp 
	function printitem(input, variation){
	var presentationstm="<font face=calibri>"; 
	for  (n=0;n<input.length;n++)
	{  	presentationstm+="<font style='top:"+1*variation+"px; position: relative' >"+input.charAt(n)+"</font>";	
			variation=0-variation;
   }
	 presentationstm+="</font>"; 
	  return presentationstm;
	}



	function printletters(lettersize,input, variation,center_top,center_left){
	var width=getwidth(input,lettersize);
	var presentationstm="<div style='left:"+(center_left-width/2)+"px; top:"+center_top+"px; position:absolute; font-size:"+lettersize+"'><font face=calibri>"; 
	for  (n=0;n<input.length;n++)
	{  	presentationstm+="<font style='top:"+1*variation+"px; position: relative' >"+input.charAt(n)+"</font>";	
			variation=0-variation;
   }
	 presentationstm+="</font></div>";
	  return presentationstm;
	}
	
/*
//rationales
var wntop=document.documentElement.clientHeight;//取得浏览器页面可视区域的宽度
var wnleft=document.documentElement.clientWidth;//取得浏览器页面可视区域的宽度
var inputtext="government";
var center_top=wntop/2;
var center_left=wnleft/2;


function getwidth(input,lettersize){
var span =document.getElementById('span'); 
document.getElementById('span').innerHTML="<font face=calibri style='color:transparent; font-size:"+lettersize+"'>"+input+"</<font>";
var rect = span.getBoundingClientRect();
var width = rect.right-rect.left;
return width;
}

	
// still useful (print2 and dividestring as a whole) but not to be used now
	function print2(lettersize,input, variation,center_top,c){
	var stimuli="";
		for  (n=0;n<input.length;n++)
	{  center_top=center_top-10*variation; 
		var temp=dividestring(n,input); 
		var presentationstm="<div style=top:"+ center_top+"px;left:"+ center_left+"px;position:absolute><font face=calibri size='"+lettersize+"'px>";	
		for (i=0;i<temp.length;i++)
		{
			presentationstm+=temp[i]; 
		}
		presentationstm+="</font></div>";
		stimuli+=presentationstm; 
			variation=0-variation;
//			center_left=center_left+2;
	   }
	 
	 	 return stimuli;
	 	}
	
	function dividestring(number, stringobject)
	{
		var divisions=[];
		if (number==0){divisions.push(stringobject.substr(number,1),"<font style='color:transparent;'>"+stringobject.substr(number+1,stringobject.length-1)+"</font>");}
		else if(number==stringobject.length-1){divisions.push("<font style='color:transparent;'>"+stringobject.substr(0,stringobject.length-1)+"</font>",stringobject.substr(number,1));}
		else 	
		{divisions.push("<font style='color:transparent;'>"+stringobject.substr(0,number)+"</font>",stringobject.substr(number,1),"<font style='color:transparent;'>"+stringobject.substr(number+1,stringobject.length-number)+"</font>")}
	   return divisions;
	}
	*/
	
	
document.write(printitem(inputtext,1));
//document.write(printletters(80,inputtext,4,center_top-50,center_left));

	
	