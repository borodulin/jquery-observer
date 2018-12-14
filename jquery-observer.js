(function($){
    $.observerOptions = $.extend({
        attributes: true,
        childList: false,
        characterData: false
    }, $.observerOptions);

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    if (MutationObserver !== undefined) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                const event = new $.Event("observe");
                event.relatedTarget = mutation;
                const $target = $(mutation.target);
                $target.trigger(event);
            });
        });
        // Special event definition.
        $.event.special.observe = {
            setup: function() {
                observer.observe(this, $.observerOptions);
            },
            teardown: function() {
                observer.disconnect();
            }
        };
    }
})(jQuery);
