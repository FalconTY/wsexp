// new goal: create an interface where the materials are stored in a separate js doc so here it is just retrieved
// material pool is determined  in a separate file, here is a testing version; below the test_materials is an array of all the trials.
// this should now suffice for most picture, reading and judgment uses
// currently, it goes to block-trial-stimuli: three layers; you need to compile all stimuli in each trial and put them tegether to form a block
//until May 3rd, 2018, the current interface is workable, and can hold any trials containing any texts or image materials as long as specified in the block_materials variable (should be retrieved through another file; all you need to set now is to create a raw material package following the block_materials format
// if further you need to do aud as well, just change the stmpresentation section accordingly(with more parameters that should be specified by aud file event; all the framework is set(path of audio file is the same as img files); however, somehow the aud file failed to be loaded there; it seems that the aud file needs to be specified separately-->reply from github developer: they fail to detect audio in preload, therefore it's really their problem.
// if need to be changed to button click , change in the stmpresentation section accordingly
//need to add a practice block 


// note, this is the main block; a separate practice block need to be established


/*
block_materials.push({   // this defines a trial to be pushed to the materials; this should be in a separate file;  be aware of this way of adding properties: use commas not semi colons;
itemlist:["Look","<font face=calibri><font style='top:3px; position: relative' >g</font><font style='top:-3px; position: relative' >o</font><font style='top:3px; position: relative' >v</font><font style='top:-3px; position: relative' >e</font><font style='top:3px; position: relative' >r</font><font style='top:-3px; position: relative' >n</font><font style='top:3px; position: relative' >m</font><font style='top:-3px; position: relative' >e</font><font style='top:3px; position: relative' >n</font><font style='top:-3px; position: relative' >t</font></font>","and","that's a","<font face=calibri><font style='top:3px; position: relative' >g</font><font style='top:-3px; position: relative' >o</font><font style='top:3px; position: relative' >v</font><font style='top:-3px; position: relative' >e</font><font style='top:3px; position: relative' >r</font><font style='top:-3px; position: relative' >n</font><font style='top:3px; position: relative' >m</font><font style='top:-3px; position: relative' >e</font><font style='top:3px; position: relative' >n</font><font style='top:-3px; position: relative' >t</font></font>","wonderful!!"],
itemidlist:["text1","text2",'testimg1',"text3","text4","testingaud1","text5"],
cresponselist:["f","f","anything","f","f","anything","f"],
//trialcrR:"Yes or No"
});

*/
// the above is a demonstration of a block raw materials; it should go to another file; current there is only ONE item in block_materials, thus only one item in exp_pool as well


//most important: expblock set; 
var expblock=new buildblock(version1);
var p_block=new buildblock(pblock);


//transition function: getting materials from the other file
function getmaterials(materials){
	this.itemlist=materials.itemlist;
	this.itemidlist=materials.itemidlist;
	this.cresponselist=materials.cresponselist;	
//	this.trialcrR=materials.trialcrR;
};

// building blocks from materials
 function buildblock(block)	
{
var block_materials=[];
block_materials.push(block);
this.blockname=block.versionname;
	
var  exp_pool=[];     // all materials for a block
for (i=0;i<block_materials.length;i++)
{exp_pool.push(new getmaterials(block_materials[i])); 
exp_pool["blockname"]=this.blockname;
}   //test matrials are specified in the material
	
this.sequence=[];
var y=exp_pool["blockname"];
	for(i=0;i<exp_pool.length;i++)
	{  var x=exp_pool[i].trialcrR;   // for some reasons unknown, have to get this x in this way, cannot insert expool[i].trialcrR directly in to the temp
		var wordlist =arrangepool(exp_pool[i]);
		this.sequence.push(new completetrial(wordlist, y, x)); // get the pool for a single trial; this can be a sentence
	}
};
	




//if in a lexical decision task, sentence1 is more like a block in itself; several sentences(blocks) can form a phase-block (e.g. practice, exp phase); if in a reading experiment, this serves as the sentence, and sentence2 for practiceblock.sequence[1], etc...note trialcrR is for each sentence (in a reading task) and may not be used for lexical decisions (the correct response array itself contains the correc response)

var sentence1=p_block.sequence[0];  
var sentence2=expblock.sequence[0];  
 


function arrangepool(material)   // create array of different stimuli
{
	var stmlist=[];
	for (i=0;i<material.itemlist.length;i++)
	{
		stmlist.push(new stm(material.itemlist[i],material.itemidlist[i],material.cresponselist[i]));
	};
	return stmlist; 
}



function stm(item,item_id,c_response){ //creat stimuli information for exp 
	this.item=item;
	this.item_id=item_id;
	if(item.indexOf('img')>=0||item.indexOf('aud')>=0)
	{	this.style=this.item;} 	else 	{this.style='<div style="font-size:60px;"><b>'+this.item+'</b></div>';}; 
    this.cresp=c_response;
}

    /* create timeline */
var timeline = [];
var results=[];
var ResText=""; 
var itemorder=1;
var trialorder=1;
var wlcm="<p align=justify style=width:400><b>INSTRUCTION</b> <br><br>Welcome to the experiment! Before starting this interesting experiment, please make sure that you are now sitting comfortably in a quiet environment and will not be disrubted in any way for the next ten minutes. Please also turned off other programs on your computers in order to fully concentrate  on this experiment  for the next ten minutes.  <br><br>In this experiment, you will see words in the center of the screen. Actually, while some of them are real words, the others are nonwords. Moreover, some of the stimuli are distorted. You task is to judge whether the stimulus you see is a real English word or not as accurately and quickly as possible.  <br><br>Now, press any key to continue with the instruction.</p> ";

// var wordlist1=arrangepool(exp_pool[0]);
	
function trialresult(){
	this.name="Stimulus,";
	this.time="RT,";
	this.response="Response,";
	this.c_response="CrtRp,"
	this.block="Block Name,"
	this.trial="Trial Number,"
	this.order="Item Order<br>";
}


	
function completetrial(stmlist,blockid,trialcrR){  //stmlist: list of stimuli generated by arrangepool();  trialcrR is the trial correct response for the final judgment section, now defined in a block;
// function sentence(){

	itemorder=1;
	this.segments=[];
	this.sl=[];
	var last_type='';
	var preparationprompt="<div align=center style=width:'700'>On your own keyboard make sure your left index finger is on the z key (for rejecting nonwords) and your right index finger is on the slash key (for accepting real words) as the illustration shows. <br><br>You will first experience some practice trials.<br><br>Press either key to proceed to the practice trials when you are ready. </div>";
	var preparationmessage="kb.jpg";
	if(blockid!="practiceblock")
	{
		 preparationprompt="<div align=center style=width:'700'><br>Now the practice phase is finished and real experiment starts.<br>Make sure again your left index finger is on the z key (for rejection) and your right index finger on the slash key (for acceptance) for acceptance. <br><br>Press either key to start the experiment trials when you are ready.</div>"		
	}
	
	for (i=0;i<stmlist.length;i++)
	{ 	var current_type='';
		if(stmlist[i].item.indexOf('img')>=0){current_type='img'}
		else if(stmlist[i].item.indexOf('aud')>=0){current_type='aud'}
		else{current_type='text'};

		if(i==0)
		{	this.sl.push({stimulus: stmlist[i].style,  data: { correct_response:stmlist[i].cresp, item_id:stmlist[i].item_id, block_id:blockid}});
			this.sl.type=current_type;
			this.segments.push(this.sl);
			last_type=current_type;
		}

else if (current_type==last_type)
{	this.sl.push({stimulus: stmlist[i].style,  data: { correct_response:stmlist[i].cresp, item_id:stmlist[i].item_id, block_id:blockid}});
	this.segments[this.segments.length-1]=this.sl;
}
else{
	this.sl=[];
	this.sl.push({stimulus: stmlist[i].style,  data: { correct_response:stmlist[i].cresp, item_id:stmlist[i].item_id, block_id:blockid}});
	this.sl.type=current_type;
	this.segments.push(this.sl);
	last_type=current_type;
}

}

	this.preparation = {
      type: "image-keyboard-response",
      stimulus:preparationmessage,
	  choices:["z","/"],
	  prompt:preparationprompt,
    };	
		
	this.fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([500], 1)[0];
      },
      data: {test_part: 'fixation'},
	  post_trial_gap: 100,
    };

		function stmpresentation(segment) {
		var presentationtype="html-keyboard-response";
		var promptmessage=""  //<div><br><br>[NO]   --------------------------------------------------------    [YES]</div>";
		if(segment.type=='text'){
		presentationtype="html-keyboard-response"	;
		}
		if(segment.type=='img'){
		presentationtype="image-keyboard-response";
		promptmessage="<p>Does it fit?</p>"
		}
		if(segment.type=='aud'){
		presentationtype="audio-keyboard-response";
		promptmessage="<p>how do we know??</p>"
		}		
	
	   var aaa= {
      type: presentationtype,
      stimulus: jsPsych.timelineVariable('stimulus'),
 // Should give choices!!
      choices: ['z', '/'],
      data: jsPsych.timelineVariable('data'),
	  post_trial_gap: 300,
	  prompt: promptmessage,
      on_finish: function(data){
        
        var x=new trialresult();
		if(itemorder==1) 
		{
		ResText=x.name+x.response+x.c_response+x.time+x.block+x.trial+x.order;	
		}
		x.time=data.rt;
		x.response=jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);   //importnat: depending on the nature of the task, it can be changed to reflect "yes/no" 
		if (x.response=="/"){ x.response="Yes"} else if (x.response=="z"){x.response="No"};
		data.correct = x.response == data.correct_response;
		x.name=data.item_id;
		x.c_response=data.correct_response;  //importnat: depending on the nature of the task, it can be changed to reflect "yes/no" 
		x.block=data.block_id;
		x.order=itemorder;
		x.trial=trialorder;
		results.push(x);
		ResText+=x.name+","+x.response+","+x.c_response+","+x.time+","+x.block+","+x.trial+","+x.order+"<br>";			
		itemorder++; 
      	}
    };  return aaa;
	}
	
	var bbbfixation=this.fixation;
//	var bbbpostprep=this.preparation; if you need preparation at the end of each stimulus
		
	function content(segment) {
		var bbb=stmpresentation(segment);
		var aaa={
      timeline: [bbbfixation, bbb],   //important to add []!
      timeline_variables: segment,
      repetitions:1,
	randomize_order: true};
	return aaa;
    }

		
// adjust accordingly 
	this.judgment1= {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:30px;">Do you think this is a grammatical sentence?<br>If grammatical, press F; Otherwise, press J</div>',
      choices: ['f', 'j'],
      data: {test_part: 'judgment1', item_id:'judgment1', block_id: blockid },
	  post_trial_gap: 100,
	  on_finish: function(data){
//       data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);  only use this for conditional setting
        var x=new trialresult();
		x.time=data.rt;
		x.response=jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
		if (x.response=="f"){ x.response="Yes"} else if (x.response=="j"){x.response="No"};
		x.name=data.item_id;
		x.c_response=trialcrR;    // x.c_response: set as a parameter in top function 
		x.block=data.block_id;
		x.order="jd1";
		x.trial=trialorder;
		results.push(x);
		ResText+=x.name+","+x.response+","+x.c_response+","+x.time+","+x.block+","+x.trial+","+x.order+"<br>";		
//		trialorder++;
					}
		}
		//adjust accordingly
		this.judgment2= {
		type: 'html-button-response',
		stimulus:'A stimulus can be displayed here if necessary',
		choices: ['Yes', 'No'],
		prompt: "<p>Do you think this is a grammatical sentence?</p>",
		data: {test_part: 'judgment2', item_id:'judgment2', block_id: blockid },
		post_trial_gap: 100,
		on_finish: function(data){
        var x=new trialresult();
		x.time=data.rt; 
		x.response=(function(){if(data.button_pressed==0){return "Yes"} else if(data.button_pressed==1){return "No"}})();  // notice (function(){})() to execute immediately the function
		x.name=data.item_id;
		x.c_response=trialcrR;    // x.c_response: set as a parameter in top function 
		x.block=data.block_id;
		x.order="jd2";
		x.trial=trialorder;
		results.push(x);
		ResText+=x.name+","+x.response+","+x.c_response+","+x.time+","+x.block+","+x.trial+","+x.order+"<br>";		
		trialorder++;
		}
      };
	  
     this.allsegments=[this.preparation];
      for (i=0;i<this.segments.length;i++)
{
	var ddd=this.segments[i];	
	var ccc=content(ddd); 
	this.allsegments.push(ccc); 
}	
//	this.allsegments.push(this.judgment1,this.judgment2);
	  
	  this.presentation={timeline: this.allsegments};
   
  };


	

 
 
 
 
 //var sentence1=new sentence();
 

 
    /* define welcome message trial */
    var welcome = {
      type: "html-keyboard-response",
      stimulus: wlcm,
    };


    /* define instructions trial */
    var instructions_practice = {
      type: "html-keyboard-response",
      stimulus:" <div align=justify style=width:'700'><b>INSTRUCTION</b> <br><br>Each stimulus will be presented in the center of the screen, following a cross '+' stimulus as a cue that the next stimulus is coming. <br> <br>Please press the z key (near left bottom of your keyboard) to indicate rejection and the / key (near right bottom of your keyboard) to indicate acceptance (as to be illustrated in the next page).  <br><br> You will try some practice trials to familiarize with the procedure before actually commencing the experiment. <br> <br>Now press any key for a better illustration of the keys to press before trying the practice trials. </div>",
      post_trial_gap: 500
    };

	  var instructions_exp= {
      type: "html-keyboard-response",
      stimulus: "the instructions first, then the real tasks",
      post_trial_gap: 500
    };
	
	var block_instr={   
		 timeline:[welcome, instructions_practice],
	}

		
	
	timeline.push(block_instr);
    /* test trials */

	

   var block_practice={
 
		timeline: [sentence1.presentation,sentence2.presentation],
	 }
   
	timeline.push(block_practice);


	
	
	
    /* define debrief */
    var debrief_block = {
      type: "html-keyboard-response",
      stimulus: "Hi, the main task of the experiment is finished. <br><br>However, there is one more favour to ask: in the next page the data of your peformance will be shown. <br>Please read the information (at the bottom of the next page) provided about saving the data and please send it to me.<br><br>I'm sorry to bother you with this but currently this website does not allow automatically sending data to the server. <br><br>Thank you so much!<br><br>Press any key to continue to the next page.",
     };
    timeline.push(debrief_block);

    /* start the experiment */
    jsPsych.init({
//		preload_audio:['aud/speech_blue.mp3'],   //importnat! need to preload audio;
      timeline: timeline,
	  
      on_finish: function() {
//		  datasave();
//		jsPsych.data.displayData();

		document.write(ResText);
	document.write("<br>"+expblock.blockname+","+subname+", <br><br><div style='font-size:20; color:blue;'>Thank you so much for your participation. <br>One last favour: please copy all content in this page (press ctrl and a keys) onto a notepad and save them as a txt file named in the following format: Your name (the same you entered at the beginning).txt <br>Please send this txt file to y.tao286@foxmail.com <br><br>Thank you so much again!</div>");
      }
    });


		
	
function datasave(){
	
	ajaxrequest('test_post.php');
	
}
	
	
	
//================================================================================================Ajax手段传输数据
var subname=prompt("Hi! Thank you very much for participating in this experiment. \n\nBefore we start, could you please provide a name or alias below for the purpose of merely recording? \n\nThanks!", "");
// create the XMLHttpRequest object, according browser
function get_XmlHttp() {
  // create the variable that will contain the instance of the XMLHttpRequest object (initially with null value)
  var xmlHttp = null;
  if(window.XMLHttpRequest) {		// for Forefox, IE7+, Opera, Safari, ...
    xmlHttp = new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {	// for Internet Explorer 5 or 6
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlHttp;
}
// sends data to a php file, via POST
function ajaxrequest(php_file) {
  var request =  get_XmlHttp();		// call the function for the XMLHttpRequest instance
  // create pairs index=value with data that must be sent to server
  var  the_data = 'subname=V1_Test_'+subname+"\n"+ResText;  //change to V2 when necessary
  request.open("POST", php_file, true);			// set the request
  // adds  a header to tell the PHP script to recognize the data as is sent via POST
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(the_data);		// calls the send() method with datas as parameter
 // subname='subname='+subname ;
 // request.send(subname);
  // Check request status
  // If the response is received completely, will be transferred to the HTML tag with tagID
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
	document.write(ResText);
	document.write("<br>"+expblock.blockname+","+subname+", <br><br>Thank you so much for your participation. <br>One last favour: please copy all content in this page (press ctrl and a keys) onto a notepad and save them as a txt file named in the following format: Your name (the same you entered at the beginning).txt <br>Please send this txt file to y.tao286@foxmail.com <br><br>Thank you so much again!");
    }
  }
}


	
	
	
	