module.exports =function(){

    var channelsDefaultGearIconOption = "Edit Channel";
    var temp = "";

    this.channelsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.channelsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.channelsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.channelsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.channelsDeleteFromGearIcon = element(by.xpath('//span/li/button/span[contains(text(),"Delete")]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

     // Added by shyam

     this.channeltextsearch = element(by.model('apiSearchText.value'));
     this.limitSalesOrderqty= element(by.model('channel.data.limitEntryToAvailableQuantity'));
     this.popupSave = element(by.xpath('//en-icon[@icon="doc-edit"]'));

     this.searchChannel = function(value){
        return this.channeltextsearch.sendKeys(value);
    }

   this.clickOnChannel = function(value){
       temp = "//span[text()='" + value + "']";
      return element(by.xpath(temp)).click();
   }

   this.clickOnlimitOrderqty = function(){
       return this.limitSalesOrderqty.click();
   }

   this.save = function(){
       return this.popupSave.click();
   }  
   
   //

    

    this.channelsSearch = function(criteria, channelsSearchValue){
/*        commons.selectOption(this.channelsSearchCriteriaDropdown,criteria);
        this.channelsSearchTextbox.clear();
//        this.channelsSearchTextbox.sendKeys(channelsSearchValue);


        for (var i = 0, len = channelsSearchValue.length; i < len; i++) {
            this.channelsSearchTextbox.sendKeys(channelsSearchValue[i]);
            browser.sleep(100);
        }


        return this.channelsSearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = channelsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(channelsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.channelsSelectGear = function(selectOption){
        this.channelsSelectGearIcon.click();
        temp = "//span/li/button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}

