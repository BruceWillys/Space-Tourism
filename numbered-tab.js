const handleSizeCHange = () => {
  const tButtons = document.querySelectorAll(".t-button");

  let currentTButton = tButtons[0];

  tButtons.forEach((tButton) => {
    if (tButton.classList.contains("current-t-button")) {
      currentTButton = tButton;
    }
  });

  currentTButton.click();
};

window.addEventListener("load", () => {
  handleSizeCHange();
});

window.addEventListener("resize", () => {
  handleSizeCHange();
});

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");
  const targetImageLg = targetTab.getAttribute("data-image-lg");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    ?.setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  // mainContainer
  //   .querySelectorAll('[role="tabpanel"]')
  //   .forEach((panel) => panel.setAttribute("hidden", true));
  hideContent(mainContainer, '[role="tabpanel"]');

  // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden");
  showContent(mainContainer, [`#${targetPanel}`]);

  // mainContainer
  //   .querySelectorAll("picture")
  //   .forEach((picture) => picture.setAttribute("hidden", true));
  hideContent(mainContainer, "picture");

  // mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden");
    if (window.innerWidth <= 720) {
        showContent(mainContainer, [`#${targetImage}`]);
    } else {
        showContent(mainContainer, [`#${targetImageLg}`]);
    }
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content)?.removeAttribute("hidden");
}

