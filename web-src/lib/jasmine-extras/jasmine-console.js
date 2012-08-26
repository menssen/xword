/**
 Jasmine Reporter that outputs test results to the browser console. 
 Useful for running in a headless environment such as PhantomJs, ZombieJs etc.

 Usage:
 // From your html file that loads jasmine:  
 jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
 jasmine.getEnv().execute();
*/

(function(jasmine, console) {
  if (!jasmine) {
    throw "jasmine library isn't loaded!";
  }

  var ANSI = {}
  ANSI.color_map = {
      "green" : 32,
      "red"   : 31,
      "yellow": 33
  }

  ANSI.colorize_text = function(text, color, bold) {
    var color_code = this.color_map[color];
    color_code = "\033[" + color_code;
    if (bold) {
        color_code += ";4";
    }
    return "\033[0m" + color_code + 'm' + text + "\033[0m";
  }
  
  var ConsoleReporter = function() {
    if (!console || !console.log) { throw "console isn't present!"; }
    this.status = this.statuses.stopped;
  };

  var proto = ConsoleReporter.prototype;
  proto.statuses = {
    stopped : "stopped",
    running : "running",
    fail    : "fail",
    success : "success"
  };

  proto.reportRunnerStarting = function(runner) {
    this.status = this.statuses.running;
    this.start_time = (new Date()).getTime();
    this.executed_specs = 0;
    this.passed_specs = 0;
    this.log("Starting...");
  };

  proto.reportRunnerResults = function(runner) {
    var failed = this.executed_specs - this.passed_specs;
    var spec_str = this.executed_specs + (this.executed_specs === 1 ? " spec, " : " specs, ");
    var fail_str = failed + (failed === 1 ? " failure in " : " failures in ");
    var color = (failed > 0)? "red" : "green";
    var dur = (new Date()).getTime() - this.start_time;

    this.log("");
    this.log("Finished");
    this.log("-----------------");
    this.log(spec_str + fail_str + (dur/1000) + "s.", color);

    this.status = (failed > 0)? this.statuses.fail : this.statuses.success;

    /* Print something that signals that testing is over so that headless browsers
       like PhantomJs know when to terminate. */
    this.log("");
    this.log("ConsoleReporter finished");
  };


  proto.reportSpecStarting = function(spec) {
    this.executed_specs++;
  };

  proto.reportSpecResults = function(spec) {
    if (spec.results().passed()) {
      this.passed_specs++;
      return;
    }

    var resultText = spec.suite.description + " : " + spec.description;
    this.log(resultText, "red");

    var items = spec.results().getItems()
    var result;
    for (var i = 0; i < items.length; i++) {
        result = items[i];
        if (result.type == 'log') {
            this.log(result.toString());
        } else if (result.type == 'expect' && result.passed && !result.passed()) {
            this.log(result.message, 'red');
            if (result.trace.stack) {
                this.log(result.trace.stack, 'red');
            }
        }
    }
  };

  var children = [];

  proto.reportSuiteResults = function(suite, depth, isInChildren) {
    if (!depth) depth = 0;

    var par = suite;
    if (!isInChildren && suite.parentSuite) {
        depth = -2;
        while (par) {
            par = par.parentSuite;
            ++depth;
        }

        if (!children[depth]) {
            children[depth] = [];
        }
        children[depth][children[depth].length] = suite;
        return;
    }
    var results = suite.results();
    var failed = results.totalCount - results.passedCount;
    var color = (failed > 0)? "red" : "green";
    color = results.totalCount > 0 ? color : "yellow";
    var pending = results.totalCount > 0 ? '' : "[PENDING] ";
    var spaces = Array(depth +1).join('  ');
    var colon = pending ? '' : ': ';

    var msg = ANSI.colorize_text(spaces + pending + suite.description + colon, color);
    if (!pending) {
        msg += ANSI.colorize_text(results.passedCount + " of " + results.totalCount, color, true);
        msg += ANSI.colorize_text(" passed", color);
    }


    this.log(msg);

    if (children[depth] && children[depth].length) {
        for (var x in children[depth]) {
            proto.reportSuiteResults.call(this, children[depth][x], depth+1, true);
        }
        children[depth] = [];
    }

  };

  proto.log = function(str, color) {
    var text = (color != undefined)? ANSI.colorize_text(str, color) : str;
    console.log(text)
  };

  jasmine.ConsoleReporter = ConsoleReporter;
})(jasmine, console);

