(function (window, document) {
  "use strict";

  var siteData = window.PapeleraElClanSiteData;

  if (!siteData) {
    return;
  }

  var getValue = function (key) {
    return siteData[key] == null ? "" : String(siteData[key]);
  };

  var setText = function () {
    document.querySelectorAll("[data-site-text]").forEach(function (element) {
      element.textContent = getValue(element.getAttribute("data-site-text"));
    });
  };

  var setHref = function () {
    document.querySelectorAll("[data-site-href]").forEach(function (element) {
      element.setAttribute("href", getValue(element.getAttribute("data-site-href")));
    });
  };

  var setContent = function () {
    document.querySelectorAll("[data-site-content]").forEach(function (element) {
      element.setAttribute("content", getValue(element.getAttribute("data-site-content")));
    });
  };

  var setLabels = function () {
    document.querySelectorAll("[data-site-label]").forEach(function (element) {
      element.setAttribute("aria-label", getValue(element.getAttribute("data-site-label")));
    });
  };

  var renderBusinessHours = function (element) {
    element.replaceChildren();

    siteData.businessHours.forEach(function (item) {
      var row = document.createElement("p");
      var label = document.createElement("strong");

      label.textContent = item.label;
      row.append(label, document.createTextNode(item.value));
      element.append(row);
    });
  };

  var renderBlocks = function () {
    document.querySelectorAll("[data-site-render]").forEach(function (element) {
      if (element.getAttribute("data-site-render") === "businessHours") {
        renderBusinessHours(element);
      }
    });
  };

  var renderSiteData = function () {
    setText();
    setHref();
    setContent();
    setLabels();
    renderBlocks();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderSiteData);
  } else {
    renderSiteData();
  }
})(window, document);
