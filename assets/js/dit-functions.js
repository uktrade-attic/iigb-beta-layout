function showcontent() {
  $(".dit-outer-wrap").show();
}
function removeloading() {
  $(".dit-loading").fadeOut(300);
}
enhance = function() {
  enhance_videobg();
};
enhance_videobg = function() {
  (0 < $("#bgVid").length || 0 < $("#bgImg").length) && $(".jumbotron").addClass("bg--transparent");
};
function onLoaded() {
  smoothScroll();
  addActive();
  checkHeight();
  prepareForm();
  formAutocomplete();
  checkFormStatus();
  ifOtherSelected();
  search();
  jsSearch();
}
function smoothScroll() {
  $('a[href^="#"]').on("click", function(a) {
    a.preventDefault();
    var b = this.hash;
    $("html, body").stop().animate({scrollTop:$(b).offset().top}, 600, "swing", function() {
      window.location.hash = b;
    });
  });
}
function addActive() {
  var a = window.location.pathname, b = a.match(/\/\w{2}\//), c = "";
  a.match(/\/industries\//) ? c = "industries/" : a.match(/\/setup-guide\//) ? c = "setup-guide/" : a.match(/\/\w{2}\/$/) && (c = "");
  $("ul.nav a") && $('ul.nav a[href="' + b[0] + c + '"]').parent().addClass("active");
}
function checkHeight() {
  var a = $("div").find(".check-height");
  0 < a.length && equalheight(a);
}
function openNav() {
  var a = 0;
  $("#searchInput").focus();
  var b = $("#dit-search-overlay"), c = a, a = b.css("margin-left");
  b.animate({"margin-top":"40px", height:"70px"}, 100);
  b.animate({"margin-left":c}, 400);
  b.animate({"margin-top":"0", height:"100%"}, 1E3, function() {
    $("body").addClass("overlay-open");
  });
}
function closeNav() {
  $("body").removeClass("overlay-open");
  $("#searchInput").val("");
  $("#search-options").empty();
  var a = $("#dit-search-overlay");
  a.css("margin-left");
  a.animate({"margin-top":"40px", height:"70px"}, 500);
  a.animate({"margin-left":"100%"}, 900);
}
function checkFormStatus() {
  var a = window.location.href, b = $(".dit-form-section__info"), c = $(".dit-form-section__body"), e = $("#formSuccess"), d = $("#enquiry_Id");
  -1 !== a.indexOf("?enquiryId=") ? (b.hide(), c.hide(), e.show(), $("html, body").animate({scrollTop:$(".dit-form-section").offset().top}, 2E3), d.text(getUrlVar())) : -1 !== a.indexOf("&enquiryId=") && (b.hide(), c.hide(), e.show(), $("html, body").animate({scrollTop:e.offset().top}, 2E3), d.text(getUrlVar()));
}
function ifOtherSelected() {
  var a = $("#industry");
  $("#other").hide();
  a.change(function(a) {
    "Other" == $("#industry option:selected").text() ? $("#other").show() : $("#other").hide();
  });
}
function getUrlVar() {
  for (var a, b = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), c = 0;c < b.length;c++) {
    a = b[c].split("="), a = a[1];
  }
  return "IIGB-" + a;
}
function prepareForm() {
  var a = $("div.setup-panel div a"), b = $(".setup-content"), c = $(".nextBtn"), e = $(".prevBtn");
  $(".submitBtn");
  var d = $("#location_selectors"), f = $("#location_radio_yes"), k = $("#location_radio_no");
  b.hide();
  d.hide();
  f.click(function(a) {
    d.show();
  });
  k.click(function(a) {
    $("#location").prop("selectedIndex", 0);
    d.hide();
  });
  $("#step-2").on("click", ".radio-group a", function() {
    var a = $(this).data("title"), b = $(this).data("toggle");
    $(this).parent().next("." + b).prop("value", a);
    $(this).parent().find('a[data-toggle="' + b + '"]').not('[data-title="' + a + '"]').removeClass("active").addClass("notActive");
    $(this).parent().find('a[data-toggle="' + b + '"][data-title="' + a + '"]').removeClass("notActive").addClass("active");
  });
  a.click(function(c) {
    c.preventDefault();
    c = $($(this).attr("href"));
    var f = $(this);
    f.hasClass("disabled") || (a.removeClass("active-selection"), f.addClass("active-selection"), b.hide(), c.show(), c.find("input:eq(0)").focus());
  });
  var h, g, l;
  $(function() {
    g = $(".dit-form-section__body").width();
    h = $(".setup-content");
    $(h).each(function() {
      $(this).css("width", g);
    });
    $(".dit-form-wrapper").wrap('<div id="mother" />');
    $("#mother").css({width:function() {
      return g;
    }, height:function() {
      return h.height();
    }, position:"relative !important", overflow:"hidden"});
    l = h.length * g + 5;
    $(".dit-form-wrapper").css({width:function() {
      return l;
    }});
  });
  c.click(function() {
    var a = $(this).closest(".setup-content"), b = parseInt(a.attr("id").split("-")[1]), c = $('div.setup-panel div a[href="#step-' + b + '"]').parent().next().children("a"), a = a.find("input[type='text'],input[type='email'], #location_radio_yes, #turnover, #country, #industry, #start_date_month, #start_date_year, #staff,input[type='date']"), f = !0;
    $(".form-group").removeClass("has-error");
    for (var d = 0;d < a.length;d++) {
      a[d].hasAttribute("required") && "" === a[d].value && (f = !1, $(a[d]).closest(".form-group").addClass("has-error"));
    }
    f && ($(".dit-form-wrapper").animate({"margin-left":-(b * g)}, 500), c.removeAttr("disabled").trigger("click"));
  });
  e.click(function() {
    var a = $(this).closest(".setup-content"), b = parseInt(a.attr("id").split("-")[1]), c = $('div.setup-panel div a[href="#step-' + b + '"]').parent().prev().children("a");
    a.find("input[type='text'],input[type='email'], #turnover:selected, #staff:selected, #country:selected, #location:selected");
    $(".dit-form-wrapper").animate({"margin-left":-((b - 2) * g)}, 500);
    c.removeAttr("disabled").trigger("click");
  });
}
function getResults(a, b) {
  var c = $(location).attr("href").split("/")[3], e = $("#search-options"), d = $("#searchInput").val();
  "" === d ? e.html("") : $.ajax({type:"GET", url:"https://pdumary9i4.execute-api.eu-west-1.amazonaws.com/staging/" + c + "?q=(or boost=2 pagetitle:'" + d + "' content:'" + d + "' intro:'" + d + "')&size=" + a + "&start=" + b + "&q.parser=structured", success:function(a) {
    console.log(a);
    e.html("");
    a.hits.hit.forEach(function(a) {
      var b = '<div class="search-result"><h3><a href="/' + a.fields.url + '">' + a.fields.pagetitle + '</a></h3><p class="search-result-link">www.great.gov.uk/' + a.fields.url + '</p><p class="search-result-snippet">' + a.fields.intro + "</p></div>";
      "" !== a.fields.pagetitle && $("#search-options").append(b);
    });
    if (a.hits.found > searchResultsSize) {
      $(".pagination").show().empty().append('<li><a class="pagination-links"     onclick="getResults(' + searchResultsSize + ',0)">1</a></li>');
      var b = Math.floor(a.hits.found / searchResultsSize);
      0 !== Math.floor(a.hits.found % searchResultsSize) && (b += 1);
      for (a = 2;a <= b;a++) {
        $(".pagination").append('<li><a style="cursor:pointer;" onclick="getResults(' + searchResultsSize + "," + (searchResultsSize * a - (searchResultsSize - 1)) + ')">' + a + "</a></li>");
      }
    } else {
      0 === a.hits.found && $("#search-options").append('<p><h3>{{ labels.no_results }}  "' + d + '"</h3></p>');
    }
  }});
}
function jsSearch() {
  var a = $(".search-button");
  a.click(function(b) {
    b.preventDefault();
    a.removeAttr("href");
    openNav();
  });
}
function search() {
  var a = debounce(function() {
    getResults(searchResultsSize, 0);
  }, 500);
  $("#searchInput").on("input", a);
}
function debounce(a, b, c) {
  var e;
  return function() {
    var d = this, f = arguments, k = c && !e;
    clearTimeout(e);
    e = setTimeout(function() {
      e = null;
      c || a.apply(d, f);
    }, b);
    k && a.apply(d, f);
  };
}
;