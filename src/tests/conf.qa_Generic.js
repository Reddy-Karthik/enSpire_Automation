var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

exports.config = {

   directConnect: true,
   framework: 'jasmine',
  // specs:['./specs/Generic/login/login.spec.js', './specs/Generic/*/*.js'],


  // specs:['./specs/Generic/login/login.spec.js','./specs/Generic/AsnUpload/*.js','./specs/Generic/InventoryPublish/*.js','./specs/Generic/resetPassword/*.js'],
   specs:['./specs/Generic/login/login.spec.js','./specs/Generic/InventoryPublish/*.js'],
  // baseUrl: process.env.BASE_URL || 'https://scl164-qa.enspirecommerce.com/oms/dist/#/',
    baseUrl: process.env.BASE_URL || 'https://project5-qa.enspirecommerce.com/dist/#/',

    getPageTimeout: 1280000,

    params: {

//        login: {
//          user: 'sbabu@pssc.com',
//          password: 'mypassword',
//        },

//        catalog: 'PSSC Catalog',
//        catalogCategoryName:'General',
//        orgName: 'PublishersStorageAndShipping-Organization-',
//        carrier: 'FEDEX',
//        serviceType: 'FedEx 2Day',
//        dataDomain: 'com.pssc'




        login: {
          user: process.env.OMS_USER || 'admin@thk.com',
          password: process.env.OMS_PASS || 'mypassword',
        },

        catalog: 'THKCatalog',
        catalogCategoryName:'General',
        orgName: 'TheHonestKitchen-Organization-',
        carrier: 'FEDEX',
        serviceType: 'FedEx 2Day',
        dataDomain: 'com.thk',
        client : 'SCL_',
        customerNumber : '000000000166',

 //       catalog: 'Candy Retail',
 //       catalogCategoryName:'Chocolate',
 //       orgName: 'CandyStore-Organization-',
 //       carrier: 'FEDEX',
 //       serviceType: 'FedEx2Day',
 //       dataDomain: 'com.candystore'

    },

    onPrepare: function(){
        browser.driver.manage().window().setPosition(0,0);
        browser.driver.manage().window().setSize(1440,900);

        browser.driver.getCapabilities().then(function (cap) {
            browser.browserName = cap.get('browserName');
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/',
            filePrefix: 'xmlresults'
        }));


        global.blobstoreUrl = browser.baseUrl + 'settings/data-management/datastore/';
        global.mailboxUrl = browser.baseUrl + 'data-management/communications/mailboxes/';
        global.capabilitiesUrl = browser.baseUrl + 'settings/accounts/capabilities/';
        global.catalogUrl = browser.baseUrl + 'inventory/catalogs/';
        global.channelsUrl = browser.baseUrl + 'settings/company/channels/';
        global.contactsUrl = browser.baseUrl + 'settings/organizations/contacts/';
        global.productUrl = browser.baseUrl + 'inventory/products/';
        global.inventoryPoolUrl = browser.baseUrl + 'inventory/pools/';
        global.siteUrl = browser.baseUrl + 'sites/';
        global.sitegroupUrl = browser.baseUrl + 'sites/groups/';
        global.shipmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
        global.shipmentsUrl = browser.baseUrl + 'fulfillment/shipments/';
        global.filesUrl = browser.baseUrl + 'data-management/communications/files/';
        global.functionaldomainsUrl = browser.baseUrl + 'settings/accounts/functional-domains/';
        global.importUrl = browser.baseUrl + 'settings/data-management/import/';
        global.purchaseOrderUrl = browser.baseUrl + 'orders/purchase/list';
        global.triggerUrl = browser.baseUrl + 'integration/triggers/';
        global.purgeUrl = browser.baseUrl + 'settings/data-management/purge/';
        global.salesOrderUrl = browser.baseUrl + 'orders/sales/list';
        global.salesOrderNewUrl = browser.baseUrl + 'orders/sales/new-1';
        global.sftpUrl = browser.baseUrl + 'settings/integration/sftp-users/';
        global.taskUrl = browser.baseUrl + 'tasks/tasks/';
        global.transferOrderUrl = browser.baseUrl + 'orders/transfers/';
        global.transferOrderNewUrl = browser.baseUrl + 'orders/transfers/new';
        global.usergroupUrl = browser.baseUrl + 'settings/accounts/user-groups/';
        global.userroleUrl = browser.baseUrl + 'settings/accounts/roles/';
        global.usersUrl = browser.baseUrl + 'settings/accounts/users/';
        global.domainPolicyUrl= browser.baseUrl + 'settings/accounts/domain-policies/';
        global.webhooksUrl = browser.baseUrl + 'integration/webhooks/';
        global.returnsUrl = browser.baseUrl + 'orders/returns/';
        global.communicationsUrl = browser.baseUrl + 'settings/integration/communication-configurations/';
        global.taxAgencySettingsUrl = browser.baseUrl + 'settings/tax/agencies/';
        global.taxRateSettingsUrl = browser.baseUrl + 'settings/tax/rates/';
        global.taxLocationSettingsUrl = browser.baseUrl + 'settings/tax/locations/';
        global.taxCodeSettingsUrl = browser.baseUrl + 'settings/tax/codes/';
        global.reportsUrl = browser.baseUrl + 'reports/reports/';
        global.invoiceUrl = browser.baseUrl + 'orders/invoices/';
        global.priceBookUrl = browser.baseUrl + 'inventory/price-books/';
        global.itemMasterUrl = browser.baseUrl + 'inventory/item-masters/';
        global.vendorManagementUrl = browser.baseUrl + 'trading-partners/vendors/';
        global.jobsDefinitionUrl = browser.baseUrl + 'integration/jobs/definitions/';
        global.jobsExecutionUrl = browser.baseUrl + 'integration/jobs/';
        global.customersUrl = browser.baseUrl + 'trading-partners/customers/';
//        global.customersUrl = browser.baseUrl + 'orders/customers/';
        global.inventorySearchUrl = browser.baseUrl + 'inventory/lookup/';
        global.routeUrl = browser.baseUrl + 'integration/routes/';
        global.skuUrl = browser.baseUrl + 'inventory/skus/';
        global.attributesUrl = browser.baseUrl + 'settings/management/attributes/';
        global.inventorypublishUrl = browser.baseUrl + 'inventory/publish/';
    },

    onComplete: function() {

     var browserName, browserVersion;
     var capsPromise = browser.getCapabilities();

     capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');

        var HTMLReport = require('protractor-html-reporter');

        testConfig = {
            reportTitle: 'Test Execution Report',
            outputPath: './reports',
            screenshotPath: './reports/screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true
        };
        new HTMLReport().from('./reports/xmlresults.xml', testConfig);

      });

    },

    onCleanUp: function(exitCode){
      var exec = require('child_process').exec, child;
          child = exec('node somescript.js',function(error,stdout,stderr){
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
       });
   },

    //--suite=purge
    suites: {
        full: 'specs/*.js',
        screens:'screens/commons.js',
        purge:'specs/purge/*.js'
    },

    allScriptsTimeout: 100000,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            prefs: {
                'download': {
                    'prompt_for_download': false,
                     directory_upgrade: true,
                    'default_directory': __dirname + '/tempFiles/',
                },
            },
        },
    },



    jasmineNodeOpts: {
        defaultTimeoutInterval: 1280000,
        showColors: true
  }
}
