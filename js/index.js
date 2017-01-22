/**
 * Created by David on 1/22/17.
 */
"use strict";
(function () {

    //Smooth scroll event listener
    $(document).on("click", ".anchorNav", function(event) {
        event.preventDefault();

        $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 500);
    });

})();
