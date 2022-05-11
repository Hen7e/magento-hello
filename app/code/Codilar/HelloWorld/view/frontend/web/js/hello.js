define(["jquery", "domReady!","hello"], function($,dom,hello){

    $(document).on('click', '#search-btn', function(e){
        // var ajxurl = $('form#search').attr('action');
        // var formdata = $('#sku').val();
        var ajxurl = jQuery('form#search').attr('action');
        var formdata = jQuery('#sku').val();
        $.ajax({
            url: ajxurl,
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: formdata,
            showLoader: true,
            success: function(data){
                location.reload();
                alert("Search");
            }
        });
        e.preventDefault();
    });

})
