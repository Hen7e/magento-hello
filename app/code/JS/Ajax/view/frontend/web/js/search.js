define(["jquery", "domReady!","search"], function($,dom,search){

    $(document).on('click', '#search-btn', function(e){
        var ajxurl = $('form#search').attr('action');
        var formdata = $('#sku').val();
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
