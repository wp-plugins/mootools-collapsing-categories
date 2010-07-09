window.addEvent('domready', function() {

	function replaceSym(symlink, state) {
	  var DiSSolviLink = new Fx.Style(symlink, 'opacity', {
			wait: false,
			duration:300
		});
	  if (typeof(expand)!='undefined' && typeof(collapse)!='undefined') {
	    if (expand=='expandImg') {
		  expand=expandSym;
		}
	    if (collapse=='collapseImg') {
		  collapse=collapseSym;
		}
	    if (symlink.className == 'sym'){if (typeof(animate)!='undefined' && animate==0) {symlink.innerHTML = state;}
	    else { DiSSolviLink.start(1,0).chain(function(){
							symlink.innerHTML = state;
							DiSSolviLink.start(0,1)
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
		var symlink = theSlides[n].getParent().getParent().getPrevious().firstChild.firstChild;
		if (slideVars[n].wrapper.offsetHeight == 0) {
						if (typeof(collapse)!='undefined') {
						replaceSym(symlink, collapse);
						}
						if (typeof(animate)!='undefined' && animate==0) {slideVars[n].show();theSlides[n].getParent().setStyle('display','block');theSlides[n].getParent().setStyle('height', 'auto');slideVars[n].wrapper.setStyle('height', 'auto');}
						    else  {
							slideVars[n].hide(); //empties the shelf
							theSlides[n].getParent().setStyle('opacity', '0');
							slideVars[n].slideIn().chain(function() {
								fadeSlide[n].start(0,1);
							});
						    }
						Cookie.set(theSlides[n].id, 'inline');
					}
					else {
						if (typeof(expand)!='undefined') {
						replaceSym(symlink, expand);
						}
						if (typeof(animate)!='undefined' && animate==0) {slideVars[n].show();theSlides[n].getParent().setStyle('display', 'none');theSlides[n].getParent().setStyle('height', '0');slideVars[n].wrapper.setStyle('height', '0');}
						else  {
						fadeSlide[n].start(1,0).chain(function() {
							slideVars[n].slideOut();
							}); //there you simply close the potentially opened other divs
						}
						Cookie.set(theSlides[n].id, 'off');
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
					if(window.ie6 && hidden){outside.getParent().setStyle('height','0px')};
				}
		});
		fadeSlide[i] = new Fx.Style(theSlides[i].getParent(), 'opacity', {
			'wait': false,
			'duration':800
		});
		//hide the sublists initially
		this.fireEvent('hideFunction', hideFunction(i));

		var toggle = theSlides[i].getParent().getParent().getPrevious().firstChild;
		toggle.addEvent('click', slideFunction.bindWithEvent(toggle, i));

		this.fireEvent('cookieCheck', cookieCheck(i));
	}
	function cookieCheck(n){
		var expandedSlide = theSlides[n].id;
		if (Cookie.get(expandedSlide)) { //check if there is a cookie with an openslide value
			if (Cookie.get(expandedSlide) != 'off' || Cookie.get(expandedSlide) == 'inline') {
			    var expandedSlideNest = theSlides[n].getParent().getParent().getParent().id;
			    if(Cookie.get(expandedSlideNest))  {
				if (Cookie.get(expandedSlideNest) == null || Cookie.get(expandedSlideNest) != 'off' || Cookie.get(expandedSlideNest) == 'inline') {
				  if (typeof(collapse)!='undefined') {
				  replaceSym(toggle.firstChild, collapse);
				  }
				  tabreset();
				  this.fireEvent('showFunction', showFunction(i));
				  var hidden = theSlides[n].getParent().getParent().getStyle('height') == '0px' ? true : false;
				  theSlides[n].getParent().getParent().setStyle('height','');
				  if(window.ie6 && hidden){theSlides[n].getParent().getParent().setStyle('height','0px')};
				}
			    }
			    else {
				  if (typeof(collapse)!='undefined') {
				  replaceSym(toggle.firstChild, collapse);
				  }
				  tabreset();
				  this.fireEvent('showFunction', showFunction(i));
				  var hidden = theSlides[n].getParent().getParent().getStyle('height') == '0px' ? true : false;
				  theSlides[n].getParent().getParent().setStyle('height','');
				  if(window.ie6 && hidden){theSlides[n].getParent().getParent().setStyle('height','0px')};
			    }
			    				   
			}
		}
	}
	function tabreset()  {
				      var tabbed = $$('.tabs');
					if(tabbed){
					  tabbed.each(function(elem, j){ if(elem.parentNode.getStyle('height') != '0px'){
					    elem.parentNode.setStyle('height','');
					    if(window.ie6 && tabbed){elem.parentNode.setStyle('height','0px')};
					  }
					  });
					}
	}

});
