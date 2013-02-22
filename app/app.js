var stats = null;
$(function($) {
	require("bootstrap");
	var template = require("./app.jade");
	$("body").html(template());
	var seqments = {
		step1: $("#step1"),
		step1collapsed: $("#step1-collapsed"),
		step2: $("#step2"),
	};
	var step1 = {
		file: $("#file"),
		stats: $("#stats"),
		loadStats: $("#load-stats"),
		loadStatsFromFile: $("#load-stats-from-file"),
		loadExample: $("#load-example"),
	};
	var step1collapsed = {
		loadNew: $("#load-new")
	};
	
	step1.loadStatsFromFile.click(function() {
		var file = step1.file[0].files[0];
		if(!file) return false;
		var fileReader = new FileReader();
		fileReader.readAsText(file, "utf-8");
		fileReader.onload  = function(e) {
			try {
				stats = JSON.parse(fileReader.result)
			} catch(e) {
				alert(e);
				return;
			}
			seqments.step1.addClass("hide");
			seqments.step1collapsed.removeClass("hide");
			seqments.step2.removeClass("hide");
			renderStats(stats, seqments.step2);
		};
		return false;
	});
	step1.loadStats.click(function() {
		try {
			stats = JSON.parse(step1.stats.val());
		} catch(e) {
			alert(e);
			return false;
		}
		seqments.step1.addClass("hide");
		seqments.step1collapsed.removeClass("hide");
		seqments.step2.removeClass("hide");
		renderStats(stats, seqments.step2);
		return false;
	});
	step1.loadExample.click(function() {
		require("bundle!./example.json")(function(example) {
			stats = example;
			seqments.step1.addClass("hide");
			seqments.step1collapsed.removeClass("hide");
			seqments.step2.removeClass("hide");
			renderStats(stats, seqments.step2);
		});
		return false;
	});
	step1collapsed.loadNew.click(function() {
		// seqments.step1.removeClass("hide");
		// seqments.step1collapsed.addClass("hide");
		// seqments.step2.addClass("hide");
		// return false;
	});
	function renderStats(stats, element) {
		require("bundle?lazy!./renderStats")(function(renderStats) {
			renderStats(stats, element);
		});
	}
});