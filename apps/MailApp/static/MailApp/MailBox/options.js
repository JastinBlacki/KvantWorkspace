Draggable.create(".draggable",{
    type:"x,y",
    onRelease:dropItem,
    });

    function dropItem(){
        var boundsBefore, boundsAfter;
        if (this.hitTest(".selected")){
            boundsBefore = this.target.getBoundingClientRect();
            $(this.target).appendTo('.unselected');
            boundsAfter = this.target.getBoundingClientRect();
            TweenMax.fromTo(this.target, 0.2, {
                x:"+=" + (boundsBefore.left - boundsAfter.left), 
                y:"+=" + (boundsBefore.top - boundsAfter.top)
            }, { x:0, y:0 });
        } else {
            if (this.hitTest(".unselected")){
                boundsBefore = this.target.getBoundingClientRect();
            $(this.target).appendTo('.selected');
            boundsAfter = this.target.getBoundingClientRect();
            TweenMax.fromTo(this.target, 0.2, {
                x:"+=" + (boundsBefore.left - boundsAfter.left), 
                y:"+=" + (boundsBefore.top - boundsAfter.top)
            }, { x:0, y:0 });
            filterFunction($('.dropdown-input')[0]);
            } else{
                TweenMax.to(this.target,0.2,{x:0,y:0});
            }
        }
    }