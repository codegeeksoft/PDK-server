"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const api_service_1 = require("../api.service");
let CurrencyConverterComponent = class CurrencyConverterComponent {
    constructor(apiService) {
        this.apiService = apiService;
    }
    ngOnInit() {
        this.apiService.getAllData('currencies').subscribe(data => this.currencydata = data, err => console.log(err), () => console.log("completed"));
    }
};
CurrencyConverterComponent = __decorate([
    core_1.Component({
        selector: 'app-currency-converter',
        templateUrl: './currency-converter.component.html',
        styleUrls: ['./currency-converter.component.css']
    }),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], CurrencyConverterComponent);
exports.CurrencyConverterComponent = CurrencyConverterComponent;
//# sourceMappingURL=currency-converter.component.js.map