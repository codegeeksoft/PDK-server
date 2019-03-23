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
let Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "orderId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "retailer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "depot", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "transport", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "supplier", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "orderQuantity", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DOUBLE('PRICE')),
    __metadata("design:type", Object)
], Order.prototype, "orderAmount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    sequelize_typescript_1.Table
], Order);
exports.Order = Order;
//# sourceMappingURL=order.js.map