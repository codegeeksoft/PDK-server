"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const api_service_1 = require("./api.service");
describe('ApiService', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [api_service_1.ApiService]
        });
    });
    it('should be created', testing_1.inject([api_service_1.ApiService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=api.service.spec.js.map