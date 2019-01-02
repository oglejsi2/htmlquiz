/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    /*
     * name: getJsonQuestionV2
     * purpose:    retrieve json with questions and answers from url
     */
    
    var questionsAnswersJson;
    var currentRecord=0;
    var lastRecord=0;
    var score=0;
    
    function getJsonQuestionsV2(parJsonUrl) {
        var requestURL =parJsonUrl;    
        var request = new XMLHttpRequest();
        var locQuestions;
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
          locQuestions = request.response;
          populateHeaderV2(locQuestions);
          setQuestionAnswer(locQuestions,0);
          questionsAnswersJson=locQuestions;
          getNumberOfQuestions(locQuestions);
        }     
    }

    function populateHeaderV2(parJsonObj) {
      var myH1 = document.createElement('h2');
      var myH2 = document.createElement('h3');
      var header = document.querySelector('header');
      myH1.textContent = parJsonObj["quizName"];
      myH2.textContent = "Rezultat: ";
      myH2.setAttribute("id","h3");
      header.appendChild(myH1);
      header.appendChild(myH2);
    }
    


    function setQuestionAnswer(parJsonObj, parCurrentRecord) {
        var locQuestion=document.getElementById("question");
        var locAnswer=document.getElementById("answer");
        var questionsAnswers = parJsonObj['questionsAnswers'];
        var suggestions = questionsAnswers[parCurrentRecord].suggestions; 
        var locQuestionString = questionsAnswers[parCurrentRecord].question; 
        locQuestion.setAttribute("value",locQuestionString);
        locAnswer.setAttribute("value","");
        
        if (!( suggestions == null )) {
            for (var i=0; i<suggestions.length; i++) {
                console.log("suggestions " + suggestions[i] );
                addRadioButton("radioButtonGroup"+i,suggestions[i] )
            }
        }
    }

    /*
     * adds radio button with label for each suggestion. Called by setQuestionAnswer
     * Look at test.html for help
     *  test.html   myFunction creates radio button
     *              brisi deletes radio buttons
     */
    function addRadioButton (parID, parValue) {
            var brloc=document.createElement("br");
            var x = document.createElement("INPUT");
            var labelX = document.createElement("LABEL");
            var textNode = document.createTextNode(parValue);
            
            brloc.setAttribute("class","radioButtonGroup")
            labelX.setAttribute("for", "radioButtonGroup"+parID);
            labelX.style.fontFamily = "Normal,Charcoal,sans-serif";
            labelX.style.fontSize="22px";
            labelX.style.color  =  "royalblue";
            labelX.setAttribute("class", "radioButtonGroup");
            labelX.appendChild(textNode);
            
            x.setAttribute("type", "radio"); 
            x.setAttribute("name", "radioButtonGroup");
            x.setAttribute("class", "radioButtonGroup");
            x.setAttribute("id", "radioButtonGroup"+parID);
            x.setAttribute("value", parValue);
            x.onclick=function() {
                setAnswer(this.value);
//                document.getElementById("answer").focus();
            };
            
            locForm1=document.getElementById("brRadioButtonGroup");
            locForm1.appendChild(x);
            locForm1.appendChild(brloc);            

            document.getElementById("brRadioButtonGroup").insertBefore(labelX,document.getElementById("radioButtonGroup"+parID));    
            
           
    }
    
    function nextQuestion() {
        var locAnswer=document.getElementById("answer").value;
        var questionsAnswers = questionsAnswersJson['questionsAnswers'];
        var correctAnswer = questionsAnswers[currentRecord].answer;  
        var locScore = document.getElementById("h3");
        if (locAnswer===correctAnswer) {  
         score=score+1;
        } else {

        }
        deleteRadioButtons();
        if (!(currentRecord===lastRecord)) {
            currentRecord=currentRecord+1;
            setQuestionAnswer(questionsAnswersJson, currentRecord);  
            locScore.textContent="Rezultat: "+score+"/"+currentRecord; 
        } else {
            currentRecord=currentRecord+1;
            locScore.textContent="Končni rezultat: "+score+"/"+currentRecord;          
        }
        
        
      
        return "ok";
    }
    
    function setAnswer(parValue) {
        var locAnswer=document.getElementById("answer");
        locAnswer.setAttribute("value",parValue);
        
    }
    
    function deleteRadioButtons() {
        var locRadioButtonGroup = document.getElementsByClassName('radioButtonGroup');
        if (!( locRadioButtonGroup == null )) {
            while (document.getElementsByClassName('radioButtonGroup')[0]) {
                document.getElementsByClassName('radioButtonGroup')[0].remove();
            }
        }
    }    

    function getNumberOfQuestions(parJsonObj) {
      var questionsAnswers = parJsonObj['questionsAnswers'];
      for(var i = 0; i < questionsAnswers.length; i++) {
          lastRecord=i;
      }  
    }