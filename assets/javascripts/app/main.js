(function(){
	if (!!$('#feed').length) {
		GitHubActivity.feed({ username: "andrewvy", selector: "#feed", limit: 5 });
	}
})();
