var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsVDPScreen = require(process.cwd() + '/src/tests/screens/ReturnVDP/returnsVDPScreen.js');

global.orderStatus = "";
global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";
global.postInventoryCount = "";
global.resInventoryCount = "";
global.updatedResCount = "";
global.postResCount = "";
global.totalAvailableQTYCount = "";
global.lineStatusesText = "";
global.reasonTextVal = "";
global.amountTextVal = "";
global.descTextVal = "";
global.errorMessage = "";
global.discountAmountAtLineItem1 = "";
global.discountAmountAtLineItem2 = "";
global.discountDetailsAmtLine1 = "";
global.discountDetailsAmtLine2 = "";
global.discountAmtBillDetails = "";
global.appeasementDetailsAmt = "";
global.appeasementAmtBillDetails = "";
global.orderlvlAppeasementval = "";
global.inventoryDetailsValue = "";
global.preTax = "";
describe('Verify that tax & discount amounts should display correctly in RMA -payment disposition:-00103', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var returnsvdp = new returnsVDPScreen();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    /* ************************************************************
        **Add SKU to the sales order from call center inventory lookup then save and release the order
        **Applying discounts
        **Create Shipment
        **Create Disposition
        ** Verify RMA has been created successfully.
        * Validate tax, discount are populating in the rma and they match with the sales order
        ************************************************************ */

    it('RMA Creation', function () {

       /* browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();
        loginScreen.setUsername(browser.params.login.loginUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);
        browser.waitForAngular();*/
//@@@

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        //element(by.xpath("//div/button[text()='Search']")).click();
        returnsvdp.clickSearch();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
        callCenter.editLineGear(1);
        callCenter.lineItemselectOptions("Change Price");
        browser.sleep(2000);
        callCenter.changingUnitPrice("25.99");
//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        callCenter.editLine();//pops up a window
        browser.sleep(2000);
        callCenter.applyDiscount("Percentage", "7", "EmployeeDiscount", "desc1", "notes1");
        browser.sleep(1000);
        callCenter.applyButton();
        browser.sleep(1000);
        callCenter.editLinePopUpSaveBtn();
        element(by.xpath("//en-icon[@ng-show = '!salesOrder.putting']")).click();
        browser.sleep(2000);
        returnsvdp.preTax("Tax:").then(function (value) {
            discountText = value;
            res = discountText.substring(1, 7);
            preTax = parseFloat(res);
            console.log(" This is while so creation:preTax>>>>>", +preTax);

            callCenter.discountAmtAtLineItem("1").then(function (value) {
                browser.sleep(1000);
                discountText = value;
                res = discountText.substring(2, 6);
                discountAmountAtLineItem1 = parseFloat(res);
                console.log(discountAmountAtLineItem1);
                expect(discountAmountAtLineItem1).toBe(1.82);

//check below method
                callCenter.amtFromBilledDetails("Discount:").then(function (value) {
                    discountText = value;
                    res = discountText.substring(2, 6);
                    discountAmtBillDetails = parseFloat(res);
                    console.log("Discount from summary", +discountAmtBillDetails);


                    browser.wait(function () {
                        return SONumber != '';
                    }).then(function () {
                        browser.get(callCenterSalesOrdersListUrl);
                        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                        //commons.multiselect();
                        browser.sleep(3000);

                        salesOrderSummary.salesOrderSelectGear("Release");
                        browser.sleep(3000);
                        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

                        browser.get(fulfillmentRequestsUrl);
                        browser.sleep(2000);
                        callCenter.OrderNumberSearch("Original Order #", SONumber);
                        browser.sleep(3000);
                        callCenter.fulfillmentOrderSelectGear("Create Shipment");
                        browser.sleep(3000);
                        callCenter.packageSelection("Box");
                        browser.sleep("500");
                        callCenter.enterItemQty("1");
                        browser.sleep(1000);
                        callCenter.addPackageToShipment();
                        browser.sleep(2000);
                        callCenter.finalizeShipment();
                        browser.sleep(3000);
                        callCenter.ViewNotesClose();

                        browser.get(shipmentRequestsUrl);
                        commons.refresh();
                        browser.sleep(3000);
                        storePortals.clickGear();
                        storePortals.FRSelectGear("Edit");
                        storePortals.navigateToShipmentsPane();

                        storePortals.getShipment().then(function (shipmentId) {
                            value = shipmentId;
                            res = value.substring(12);
                            shipmentId = res;
                            console.log("shipmentId>>>>" + shipmentId);

//<<<<<<**** Navigate to Returns- vendor portal
                            browser.get(vendorPortalReturnsUrl);
                            browser.driver.sleep(2000);
                            storePortals.searchShipment("Order #", '', SONumber);
                            browser.sleep(1000);
                            returnsvdp.selectOrderFromSearch();
                            browser.sleep(1000);
                            commons.search();
                            browser.sleep(1000);
                            returnsvdp.selectOrderFromResults();
                            returnsvdp.inspectReturn();
                            browser.sleep(1000);
                            //***<<<<  Below method to check if submit button is disabled when disposition details are blank >>>>******
                            returnsvdp.submitDispositionStatus().then(function (status) {
                                console.log(status);
                                browser.sleep(1000);
                                expect(status).toBe(null);
                            });
                            browser.sleep(1000);
                            //***<<<< Get return Qty and store it in a varibale >>>>******
                            returnsvdp.getReturnQty().then(function (qty) {
                                returnQTy = parseInt(qty);
                                console.log("returnQTy>>>>", +returnQTy);
                            })
                            returnsvdp.enterDisposition(1);
                            returnsvdp.validateMissingReason(1).then(function (errorMsg) {
                                expect(errorMsg).toEqual("Reason cannot be Blank");
                            });
                            returnsvdp.deleteRow();
                            returnsvdp.addDisposition(1, "DAMAGED", "this is testing");
                            //Saves the return disposition
                            returnsvdp.clickSave();
                            //View the disposition
                            returnsvdp.clickView(1);
                            returnsvdp.submitReturns();
                            browser.sleep(3000);
                            //***<<<< Navigate to Return-Payment Disposition and verify RMA creation >>>>******
                            browser.get(paymentDispositionUrl);
                            storePortals.searchShipment("Order #", '', SONumber);
                            browser.sleep(1000);
                            //***<<<< Validation to confirm RMA status :to be 'Inspected' >>>>>>>****
                            returnsvdp.getRMAStatus().then(function (status) {
                                expect(status).toBe('INSPECTED');
                            })
                            returnsvdp.clickRMA();
                            browser.sleep(3000);

                            //*****<<<<< Validation to confirm Return Qty  >>>>******
                            returnsvdp.confirmAttribute(4).then(function (returQty) {
                                expect(returQty).toBe('1');
                            })
                            returnsvdp.getTaxDiscount(2).then(function (value) {
                                discountText = value;
                                console.log("discountText", +discountText);
                                res = discountText.substring(3, 7);
                                console.log("Discount", +res);
                                console.log("discountAmtBillDetails", +discountAmtBillDetails);
                                expect(parseFloat(res)).toBe(discountAmtBillDetails);
                            })

                            // Verify tax to be matching with salesorder tax
                            returnsvdp.getTaxDiscount(3).then(function (value) {
                                rmaTax = value.substring(2, 7);
                                console.log("rmaTax", +rmaTax);
                                console.log("preTax>>>>>>>", +preTax);
                                expect(parseFloat(rmaTax)).toBe(preTax);
                            })

                        })

                    });
                })
            })

        })
    });

})

