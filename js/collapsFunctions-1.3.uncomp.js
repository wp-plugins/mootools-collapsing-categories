window.addEvent('domready', function() {

	function replaceSym(symlink, state) {
	  var DiSSolviLink = new Fx.Tween(symlink, {
			wait: false,
			duration:300
		});  
	  if (typeof(collapseText)!='undefined' && typeof(expandText)!='undefined') {
	    var SymText;
	    if (state==collapse){
	      SymText=collapseText;
	    }
	    else if (state==expand){
	      SymText=expandText;
	    }
	    symlink.parentNode.setAttribute('title',SymText);
	  }
	  if (typeof(expand)!='undefined' && typeof(collapse)!='undefined') {
	    if (expand=='expandImg') {
		  expand=expandSym;
		}
	    if (collapse=='collapseImg') {
		  collapse=collapseSym;
		}
	    if (symlink.className == 'sym'){if (typeof(animate)!='undefined' && animate==0) {symlink.innerHTML = state;}
	    else { DiSSolviLink.start('opacity',1,0).chain(function(){
							symlink.innerHTML = state;							
							DiSSolviLink.start('opacity',0,1);
							});
	    }
	    
	    }
	  }
	 }

	//find a collection of every ul within a li (submenus) within ul class collapsing
	var theSlides = $$('ul.collapsing li ul');
	//will hold the Fx.Slide objects
	var slideVars = new Array(theSlides.length);
	var fadeSlide = new Array(theSlides.length);

	//handle the slide event on click
	function slideFunction(event, n){
		// var e = new Event(event);
		// slideVars[n].toggle();
		// e.stop();
		new Event(event).stop();
		tabreset();
		//alert('n'+n);
		//alert('slength'+theSlides.length);
		var symlink = theSlides[n].getParent().getParent().getPrevious().getFirst().getFirst();
		// theId = theSlides[n].id;
		if (slideVars[n].wrapper.offsetHeight == 0) {
						if (typeof(collapse)!='undefined') {
						replaceSym(symlink, collapse);
						}
						if (typeof(animate)!='undefined' && animate==0) {slideVars[n].show();theSlides[n].getParent().setStyle('display','block');theSlides[n].getParent().setStyle('height', 'auto');slideVars[n].wrapper.setStyle('height', 'auto');}
						    else  {
							slideVars[n].hide(); //empties the shelf
							theSlides[n].getParent().setStyle('opacity','0');
							slideVars[n].slideIn().chain(function() {
								fadeSlide[n].start('opacity',0,1);
							});
						    }
						Cookie.write(theSlides[n].id, 'inline');
						// if (collapsItems[theId]) {
						//  theSlides[n].innerHTML=collapsItems[theId];
						// }
					}
					else {
						if (typeof(expand)!='undefined') {
						replaceSym(symlink, expand);
						}
						if (typeof(animate)!='undefined' && animate==0) {slideVars[n].show();theSlides[n].getParent().setStyle('display', 'none');theSlides[n].getParent().setStyle('height', '0');slideVars[n].wrapper.setStyle('height', '0');}
						else  {
						fadeSlide[n].start('opacity',1,0).chain(function() {
							slideVars[n].slideOut();
							tabreset();
							}); //there you simply close the potentially opened other divs
						}
						Cookie.write(theSlides[n].id, 'off');
						// if (collapsItems[theId]) {
						//  theSlides[n].innerHTML='<li></li>';
						// }
					}
	}
	
	function hideFunction(n){
		slideVars[n].hide();
	}
	function showFunction(n){
		slideVars[n].show();
	}
	for(var i=0; i < theSlides.length; i++){
		//add the slide effect to each sublist element
		slideVars[i] = new Fx.Slide(theSlides[i].getParent(),{
			'duration': 600,
			'transition': Fx.Transitions.Cubic.easeOut,
			'onComplete':
				function(outside) {
					var hidden = outside.getParent().getStyle('height') == '0px' ? true : false;
					outside.getParent().setStyle('height','');
					if(Browser.ie6 && hidden){outside.getParent().setStyle('height','0px')};
				}
		});
		fadeSlide[i] = new Fx.Tween(theSlides[i].getParent(), {
			'wait': false,
			'duration':800
		});
		//hide the sublists initially
		this.fireEvent('hideFunction', hideFunction(i));

		var toggle = theSlides[i].getParent().getParent().getPrevious().getFirst();
		/*
		toggle.addEvent('click', function(e, scurcula){
		  alert('i'+scurcula);
		  alert('slength'+theSlides.length);
		  //slideFunction(e, i);
		  var slideBound = slideFunction.bind(toggle, e, i);
		  slideBound();
		});
		*/
		// toggle.addEvent('click', slideFunction.bindWithEvent(toggle, i));
		// SLIDEFUNCTION (EVENT, N) BINDWITHEVENT(OBJECT THIS, ARG)
		toggle.i = i;
		toggle.addEvent('click', function(e){
		  //alert('i'+this.i);
		  //alert('slength'+theSlides.length);
		  slideFunction(e, this.i);
		  }.bind(toggle));
		this.fireEvent('cookieCheck', cookieCheck(i));
	}
	function cookieCheck(n){
		var expandedSlide = theSlides[n].id;
		var toggled = theSlides[i].getParent().getParent().getPrevious().getFirst();
		if (Cookie.read(expandedSlide)) { //check if there is a cookie with an openslide value
			if (Cookie.read(expandedSlide) != 'off' || Cookie.read(expandedSlide) == 'inline') {
			    var expandedSlideNest = theSlides[n].getParent().getParent().getParent().id;
			    if(Cookie.read(expandedSlideNest))  {
				if (Cookie.read(expandedSlideNest) == null || Cookie.read(expandedSlideNest) != 'off' || Cookie.read(expandedSlideNest) == 'inline') {
				  if (typeof(collapse)!='undefined') {
				  replaceSym(toggled.getFirst(), expand);
				  }
				  this.fireEvent('showFunction', showFunction(i));
				  var hidden = theSlides[n].getParent().getParent().getStyle('height') == '0px' ? true : false;
				  theSlides[n].getParent().getParent().setStyle('height','');
				  if(Browser.ie6 && hidden){theSlides[n].getParent().getParent().setStyle('height','0px')};
				  tabreset();
				}
			    }
			    else {
				  if (typeof(collapse)!='undefined') {
				  replaceSym(toggled.getFirst(), collapse);
				  }
				  this.fireEvent('showFunction', showFunction(i));
				  var hidden = theSlides[n].getParent().getParent().getStyle('height') == '0px' ? true : false;
				  theSlides[n].getParent().getParent().setStyle('height','');
				  if(Browser.ie6 && hidden){theSlides[n].getParent().getParent().setStyle('height','0px')};
				  tabreset();
			    }
			    				   
			} else {
			   if (typeof(collapse)!='undefined') {
				  replaceSym(toggled.getFirst(), expand);
				  }
			  tabreset();
			  }
		}
	}
	function tabreset()  {
				      var tabbed = $$('.tabs');
					if(tabbed){
					  tabbed.each(function(elem, j){ if(elem.parentNode.getStyle('height') != '0px'){
					    elem.parentNode.setStyle('height','');
					    if(Browser.ie6 && tabbed){elem.parentNode.setStyle('height','0px')};
					  }
					  });
					}
	}

});