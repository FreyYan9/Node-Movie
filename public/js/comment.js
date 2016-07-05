$(function(){
	$(".comment").click(function(e){
		var target = $(this);
		var commentId = target.data("cid");
		var toId = target.data("tid");

		if($("#cid").length){

			$("#cid").val(commentId);
			$("#tid").val(toId);

		}else{

			$("<input>").attr({
				id : "cid",
				type : "hidden",
				name : "comment[cid]",
				value : commentId
			}).appendTo("#commentForm");

			$("<input>").attr({
				id : "tid",
				type : "hidden",
				name : "comment[tid]",
				value : toId
			}).appendTo("#commentForm");
		}
	});
});