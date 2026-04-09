function initProductOffers(root) {
  if (!root) return;

  const offerGroups = root.querySelectorAll("[data-product-offers]");
  offerGroups.forEach((group) => {
    if (group.dataset.offersReady === "true") return;
    group.dataset.offersReady = "true";

    const sectionId = group.getAttribute("data-section-id");
    const sectionRoot = group.closest("product-info");
    if (!sectionRoot || !sectionId) return;

    const offerInputs = Array.from(group.querySelectorAll(".supply-option__input"));
    const hiddenVariantInputs = Array.from(sectionRoot.querySelectorAll(".product-variant-id"));
    const selectedPrice = group.querySelector("[data-selected-price]");
    const selectedShipping = group.querySelector("[data-selected-shipping]");
    const stickyPrice = sectionRoot.querySelector("[data-selected-sticky-price]");
    const stickySubmit = sectionRoot.querySelector("[data-sticky-submit]");
    const submitButton = sectionRoot.querySelector(`#ProductSubmitButton-${sectionId}`);
    const submitLabel = submitButton ? submitButton.querySelector("span") : null;

    const syncSelectedOffer = (input) => {
      if (!input) return;

      const variantId = input.getAttribute("data-variant-id") || "";
      const priceLabel = input.getAttribute("data-price-label") || "";
      const shippingNote = input.getAttribute("data-shipping-note") || "";
      const ctaText = input.getAttribute("data-cta-text") || "";

      hiddenVariantInputs.forEach((variantInput) => {
        variantInput.value = variantId;
      });

      if (selectedPrice) selectedPrice.textContent = priceLabel;
      if (selectedShipping) selectedShipping.textContent = shippingNote;
      if (stickyPrice) stickyPrice.textContent = priceLabel;
      if (submitLabel && ctaText) submitLabel.textContent = ctaText;
    };

    offerInputs.forEach((input) => {
      input.addEventListener("change", () => syncSelectedOffer(input));
    });

    const activeInput = offerInputs.find((input) => input.checked) || offerInputs[0];
    syncSelectedOffer(activeInput);

    if (stickySubmit && submitButton) {
      stickySubmit.addEventListener("click", () => {
        submitButton.click();
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initProductOffers(document);
});

document.addEventListener("shopify:section:load", (event) => {
  initProductOffers(event.target);
});
