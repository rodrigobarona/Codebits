var pull_example = new Lungo.Element.Pull('section#main article', {
    onPull: "Pull down to refresh",
    onRelease: "Release to get new data",
    onRefresh: "Refreshing...",
    callback: function() {
        Lungo.Data.Cache.get("skill");
        Lungo.Core.execute(get_users);
        pull_example.hide();
    }
});
