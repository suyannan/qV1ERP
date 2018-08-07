const { export_json_to_excel } = require('../vendor/Export2Excel');
var obj={
  exportExcel:function (theader,filterVal,tableData,excelName) {
    require.ensure([], () => {
      const tHeader =theader ;
      const data = this.formatJson(filterVal, tableData);
      export_json_to_excel(tHeader, data, excelName);
    })
  },
  formatJson:function (filterVal,jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  }
};

export default obj;


