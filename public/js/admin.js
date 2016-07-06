$(function () {
    $(".del").click(function (e) {
        var target = $(e.target);
        var id = target.data("id");
        var tr = target.parent().parent();
        var url = "/admin/list/" + id;
        console.log(url);
        $.ajax({
            type: "DELETE",
            url: "/admin/list/" + id
        }).done(function (result) {
            if (result) {
                if (tr) {
                    tr.fadeIn('slow/400/fast', function () {
                        tr.remove();
                    });
                    ;
                }
                ;
            }
            ;
        });
    });
    $("#douban").blur(function (e) {
        var obj = $(this);
        var movieId = obj.val();
        if (movieId) {
            $.ajax({
                url: "https://api.douban.com/v2/movie/subject/" + movieId,
                type: "get",
                dataType: "jsonp",
                cache : true,
                crossDomain : true,
                jsonp : "callback",
                success : function (data) {
                    console.log(data)
                    $("#inputTitle").val(data.title);
                    //$("#category").val(data.directors[0].name);
                    $("#doctor").val(data.directors[0].name);
                    $("#country").val(data.countries[0]);
                    //$("#language").val(data.);
                    $("#summary").val(data.casts[0].name);
                    $("#year").val(data.year);
                    $("#poster").val(data.images.large);
                    //$("#flash").val(data.);
                    $("#desc").val(data.summary);
                }
            });
        }
    });
});