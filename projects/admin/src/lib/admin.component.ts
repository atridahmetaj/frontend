import { SelectItem, MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '@ms-system/layout';

@Component({
  selector: 'lib-admin',
  template: `
  <div class="ui-g ui-fluid">
  <div class="ui-g-12 ui-lg-6">
      <!-- Left Side -->
      <div class="card">
          <div class="card-title">InputText</div>
          <div class="ui-g form-group">
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield">
                      <input type="text" pInputText>
                      <label>Name</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield">
                      <input type="text" pInputText>
                      <label>Email</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield">
                      <input type="text" pInputText>
                      <label>Phone</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <input type="text" pInputText placeholder="Disabled" disabled="disabled">
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield">
                      <input type="text" pInputText class="ng-dirty ng-invalid" placeholder="Invalid">
                      <div class="ui-message ui-messages-error ui-corner-all">
                          This field is required
                      </div>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <input type="text" pInputText>
              </div>
          </div>

          <div class="card-title">Filled InputText</div>
          <div class="ui-g form-group">
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield md-inputfield-fill">
                      <input type="text" pInputText>
                      <label>Name</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield md-inputfield-fill">
                      <input type="text" pInputText>
                      <label>Email</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield md-inputfield-fill">
                      <input type="text" pInputText>
                      <label>Phone</label>
                  </span>
              </div>
          </div>

          <div class="card-title">TextBox</div>
          <div class="ui-g form-group">
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield md-inputfield-box">
                      <input type="text" pInputText>
                      <label>Name</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield md-inputfield-box">
                      <input type="text" pInputText>
                      <label>Email</label>
                  </span>
              </div>
              <div class="ui-g-12 ui-md-4">
                  <span class="md-inputfield md-inputfield-box">
                      <input type="text" pInputText>
                      <label>Phone</label>
                  </span>
              </div>
          </div>
      </div>

      <div class="card">
          <div class="card-title">TextArea</div>
          <textarea [rows]="3" [cols]="30" pInputTextarea placeholder="Your Message" autoResize="autoResize"></textarea>
      </div>

      <div class="card">
          <div class="card-title">Calendar</div>
          <div class="ui-g form-group">
              <div class="ui-g-12">
                  <p-calendar placeholder="Popup" [showButtonBar]="true"></p-calendar>
              </div>
              <div class="ui-g-12">
                  <p-calendar dateFormat="mm/dd/yy" showTime="true" placeholder="DateTime" [minDate]="yesterday"></p-calendar>
              </div>
              <div class="ui-g-12">
                  <p-calendar [showIcon]="true" placeholder="Button"></p-calendar>
              </div>
              <div class="ui-g-12">
                  <p-calendar [numberOfMonths]="3" placeholder="Multiple Months"></p-calendar>
              </div>
              <div class="ui-g-12">
                  <p-calendar placeholder="Month Picker" dateFormat="mm/yy" view="month"></p-calendar>
              </div>
          </div>
      </div>

      <div class="card">
          <div class="card-title">Chips</div>
          <p-chips></p-chips>
      </div>
  </div>

  <div class="ui-g-12 ui-lg-6">
      <div class="card">
          <div class="card-title">Checkboxes</div>
          <div class="ui-g">
              <div class="ui-g-12 ui-md-4"><p-checkbox name="cg" value="Ultima" label="Ultima" [(ngModel)]="checkboxValues"></p-checkbox></div>
              <div class="ui-g-12 ui-md-4"><p-checkbox name="cg" value="Icarus" label="Icarus" [(ngModel)]="checkboxValues"></p-checkbox></div>
              <div class="ui-g-12 ui-md-4"><p-checkbox name="cg" value="Omega" label="Omega" [(ngModel)]="checkboxValues"></p-checkbox></div>
          </div>
          <div class="card-title">RadioButtons</div>
          <div class="ui-g">
              <div class="ui-g-12 ui-md-4"><p-radioButton name="rg" value="Ultima" label="Ultima" [(ngModel)]="radioValue"></p-radioButton></div>
              <div class="ui-g-12 ui-md-4"><p-radioButton name="rg" value="Icarus" label="Icarus" [(ngModel)]="radioValue"></p-radioButton></div>
              <div class="ui-g-12 ui-md-4"><p-radioButton name="rg" value="Omega" label="Omega" [(ngModel)]="radioValue"></p-radioButton></div>
          </div>
      </div>

      <div class="card">
          <div class="card-title">Dropdown</div>
          <p-dropdown [options]="cities" [(ngModel)]="selectedCity1"></p-dropdown>

          <div class="card-title">MultiSelect</div>
          <p-multiSelect [options]="carOptions" [(ngModel)]="selectedMultiSelectCars"></p-multiSelect>
      </div>

      <div class="card">
          <div class="card-title">Listbox</div>
          <p-listbox [options]="citiesListbox" [(ngModel)]="selectedCity2" filter="true"></p-listbox>
      </div>

      <div class="card">
          <div class="card-title">Password</div>
          <input pPassword type="password"/>
      </div>

      <div class="card">
          <div class="card-title">Spinner</div>
          <p-spinner></p-spinner>

          <div class="card-title">Rating</div>
          <p-rating [(ngModel)]="ratingValue"></p-rating>

          <div class="card-title">InputSwitch</div>
          <p-inputSwitch [(ngModel)]="switchChecked"></p-inputSwitch>
      </div>

      <div class="card">
          <div class="card-title">Slider</div>
          <p-slider [(ngModel)]="rangeValues" [range]="true"></p-slider>
      </div>

      <div class="card">
          <div class="card-title">ColorPicker</div>
          <p-colorPicker [(ngModel)]="color"></p-colorPicker>
      </div>
  </div>

  <div class="ui-g-12">
      <div class="card">
          <div class="card-title">Input Groups</div>

          <div class="ui-g form-group">
              <div class="ui-g-12 ui-md-6">
                  <div class="ui-inputgroup">
                      <span class="ui-inputgroup-addon"><i class="material-icons">account_circle</i></span>
                      <span class="md-inputfield">
                          <input type="text" pInputText>
                          <label>Username</label>
                      </span>
                  </div>
              </div>

              <div class="ui-g-12 ui-md-6">
                  <div class="ui-inputgroup">
                      <span class="ui-inputgroup-addon"><i class="material-icons">credit_card</i></span>
                      <span class="ui-inputgroup-addon"><i class="material-icons">card_travel</i></span>
                      <span class="md-inputfield">
                          <input type="text" pInputText>
                          <label>Price</label>
                      </span>
                      <span class="ui-inputgroup-addon">$</span>
                      <span class="ui-inputgroup-addon">.00</span>
                  </div>
              </div>

              <div class="ui-g-12 ui-md-6">
                  <div class="ui-inputgroup">
                      <span class="md-inputfield">
                          <input type="text" pInputText>
                          <label>Keyword</label>
                      </span>
                      <button pButton type="button" icon="ui-icon-search"></button>
                  </div>
              </div>

              <div class="ui-g-12 ui-md-6">
                  <div class="ui-inputgroup">
                      <span class="ui-inputgroup-addon"><p-checkbox></p-checkbox></span>
                      <span class="md-inputfield">
                          <input type="text" pInputText>
                          <label>Confirm</label>
                      </span>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <div class="ui-g-12 ui-g-nopad">
      <div class="ui-g-12 ui-lg-6" style="padding-top:0">
          <div class="card">
              <div class="card-title">Buttons</div>

              <div class="ui-g">
                  <div class="ui-g-12">ToggleButton</div>
                  <div class="ui-g-12">
                      <p-toggleButton [(ngModel)]="toggleButtonChecked"></p-toggleButton>
                  </div>

                  <div class="ui-g-12">SelectButton</div>
                  <div class="ui-g-12">
                      <p-selectButton [options]="types" [(ngModel)]="selectedType"></p-selectButton>
                  </div>

                  <div class="ui-g-12">Button</div>
                  <div class="ui-g-12">
                      <button type="button" label="Bookmark" pButton></button>
                  </div>

                  <div class="ui-g-12">Left Icon</div>
                  <div class="ui-g-12">
                      <button type="button" label="Clear" pButton icon="ui-icon-clear"></button>
                  </div>

                  <div class="ui-g-12">Right Icon</div>
                  <div class="ui-g-12">
                      <button type="button" label="Clear" pButton icon="ui-icon-clear" iconPos="right"></button>
                  </div>

                  <div class="ui-g-12">Icon Only</div>
                  <div class="ui-g-12">
                      <button type="button" icon="ui-icon-add" pButton></button>
                  </div>

                  <div class="ui-g-12">Link</div>
                  <div class="ui-g-12"><a href="http://www.primefaces.org" target="_blank">Homepage</a></div>

                  <div class="ui-g-12">SplitButton</div>
                  <div class="ui-g-12">
                      <p-splitButton label="Save" icon="ui-icon-save" [model]="splitButtonItems"></p-splitButton>
                  </div>
              </div>
          </div>
      </div>
      <div class="ui-g-12 ui-lg-6" style="padding-top:0">
          <div class="card">
              <div class="card-title">Colored Buttons</div>
              <p>Raised and Flat buttons with various color alternatives.</p>

              <div class="ui-g buttons-grid">
                  <div class="ui-g-12 ui-md-6" style="text-align:center">
                      <button pButton type="button" label="Primary"></button>

                      <div>
                          <button pButton type="button" label="Inline" style="width:auto"></button>
                      </div>

                      <button pButton type="button" label="Secondary" class="ui-button-secondary"></button>

                      <button pButton type="button" label="Green / Success" class="ui-button-success"></button>

                      <button pButton type="button" label="Blue / Info" class="ui-button-info"></button>

                      <button pButton type="button" label="Amber / Warning" class="ui-button-warning"></button>

                      <button pButton type="button" label="Red / Danger" class="ui-button-danger"></button>

                      <button pButton type="button" label="Blue-Grey" class="blue-grey-btn"></button>

                      <button pButton type="button" label="Cyan" class="cyan-btn"></button>

                      <button pButton type="button" label="Teal" class="teal-btn"></button>

                      <button pButton type="button" label="Orange" class="orange-btn"></button>

                      <button pButton type="button" label="Deep-Orange" class="deep-orange-btn"></button>

                      <button pButton type="button" label="Purple" class="purple-btn"></button>

                      <button pButton type="button" label="Indigo" class="indigo-btn"></button>

                      <button pButton type="button" label="Pink" class="pink-btn"></button>
                  </div>

                  <div class="ui-g-12 ui-md-6" style="text-align:center">
                      <button pButton type="button" label="Primary" styleClass="flat"></button>

                      <div>
                          <button pButton type="button" label="Inline" style="margin-bottom:10px;width:auto" styleClass="flat"></button>
                      </div>

                      <button pButton type="button" label="Secondary" class="ui-button-secondary flat"></button>

                      <button pButton type="button" label="Green / Success" class="green-btn flat"></button>

                      <button pButton type="button" label="Blue / Info" class="blue-btn flat"></button>

                      <button pButton type="button" label="Amber / Warning" class="amber-btn flat"></button>

                      <button pButton type="button" label="Red / Danger" class="red-btn flat"></button>

                      <button pButton type="button" label="Blue-Grey" class="blue-grey-btn flat"></button>

                      <button pButton type="button" label="Cyan" class="cyan-btn flat"></button>

                      <button pButton type="button" label="Teal" class="teal-btn flat"></button>

                      <button pButton type="button" label="Orange" class="orange-btn flat"></button>

                      <button pButton type="button" label="Deep-Orange" class="deep-orange-btn flat"></button>

                      <button pButton type="button" label="Purple" class="purple-btn flat"></button>

                      <button pButton type="button" label="Indigo" class="indigo-btn flat"></button>

                      <button pButton type="button" label="Pink" class="pink-btn flat"></button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>

  `,
  styles: []
})
export class AdminComponent implements OnInit {

  country: any;

  filteredCountries: any[];

  brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

  filteredBrands: any[];

  selectedBrands: string[];

  yesterday: Date = new Date();

  carOptions: SelectItem[];

  selectedMultiSelectCars: string[] = [];

  cities: SelectItem[];

  citiesListbox: SelectItem[];

  selectedCity1: any;

  selectedCity2: any;

  ratingValue: number;

  checkboxValues: string[] = [];

  radioValues: string[];

  switchChecked: boolean;

  rangeValues: number[] = [20, 80];

  toggleButtonChecked: boolean;

  types: SelectItem[];

  splitButtonItems: MenuItem[];

  radioValue: string;

  selectedType: string;

  color: string;

  constructor(private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
          {label: 'Components'},
          {label: 'Forms', routerLink: ['/forms']}
      ]);
  }

  ngOnInit() {
      this.carOptions = [];
      this.carOptions.push({label: 'Audi', value: 'Audi'});
      this.carOptions.push({label: 'BMW', value: 'BMW'});
      this.carOptions.push({label: 'Fiat', value: 'Fiat'});
      this.carOptions.push({label: 'Ford', value: 'Ford'});
      this.carOptions.push({label: 'Honda', value: 'Honda'});
      this.carOptions.push({label: 'Jaguar', value: 'Jaguar'});
      this.carOptions.push({label: 'Mercedes', value: 'Mercedes'});
      this.carOptions.push({label: 'Renault', value: 'Renault'});
      this.carOptions.push({label: 'VW', value: 'VW'});
      this.carOptions.push({label: 'Volvo', value: 'Volvo'});

      this.cities = [];
      this.cities.push({label: 'Select City', value: 0});
      this.cities.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
      this.cities.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
      this.cities.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
      this.cities.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
      this.cities.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});

      this.citiesListbox = this.cities.slice(1);

      this.types = [];
      this.types.push({label: 'Apartment', value: 'Apartment'});
      this.types.push({label: 'House', value: 'House'});
      this.types.push({label: 'Studio', value: 'Studio'});

      this.splitButtonItems = [
          {label: 'Update', icon: 'ui-icon-update'},
          {label: 'Delete', icon: 'ui-icon-close'},
          {label: 'Home', icon: 'ui-icon-home', url: 'http://www.primefaces.org/primeng'}
      ];
  }

  filterCountry(event) {
      const query = event.query;
      this.filteredCountries = [];
  }

  searchCountry(query, countries: any[]): any[] {
      // in a real application, make a request to a remote url with the query and return filtered results,
      // for demo we filter at client side
      const filtered: any[] = [];
      for (const item of countries) {
          const country = item;
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
              filtered.push(country);
          }
      }
      return filtered;
  }

  filterBrands(event) {
      this.filteredBrands = [];
      for (const item of this.brands) {
          const brand = item;
          if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
              this.filteredBrands.push(brand);
          }
      }
  }

  handleACDropdownClick(event: Event) {
      this.filteredBrands = [];

      // mimic remote call
      setTimeout(() => {
          this.filteredBrands = this.brands;
      }, 100);
  }
}
