$(function(){
	$(".del").click(function(e){
		var target = $(e.target);
		var id = target.data("id");
		var tr = target.parent().parent();
		var url = "/admin/list/" + id;
		console.log(url);
		$.ajax({
			type : "DELETE",
			url : "/admin/list/" + id
		}).done(function(result){
			if(result){
				if(tr){
					tr.fadeIn('slow/400/fast', function() {
					 tr.remove();
					});;
				};
			};
		});

	});
});