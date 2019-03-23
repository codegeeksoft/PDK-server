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
/* jshint indent: 2 */
const sequelize_typescript_1 = require("sequelize-typescript");
let Oil = class Oil extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Oil.prototype, "oilType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Oil.prototype, "oilCode", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DOUBLE('PRICE')),
    __metadata("design:type", Number)
], Oil.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Oil.prototype, "maxQuantity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Oil.prototype, "availableQuantity", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Oil.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Oil.prototype, "updatedAt", void 0);
Oil = __decorate([
    sequelize_typescript_1.Table
], Oil);
exports.Oil = Oil;
//# sourceMappingURL=oil.js.map