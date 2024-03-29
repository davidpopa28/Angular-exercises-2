import { Component, OnInit } from '@angular/core';
import { Store } from '../models/store';
import { StoresService } from '../services/stores.service';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
})
export class StoresComponent implements OnInit {
  constructor(private storeService: StoresService) {}
  stores: Store[] = [];
  emptyStore: Store = {
    id: undefined,
    name: '',
    city: '',
    country: '',
    monthlyIncome: 0,
    ownerName: '',
    activeSince: new Date(),
  };
  filteredStores: Store[] = [];
  keyword!: string;
  cityKeyword!: string;
  countryKeyword!: string;
  newOwnerName: string = '';
  editedStore: Store = { ...this.emptyStore };
  toEditStore: Store = { ...this.emptyStore };
  store: Store = { ...this.emptyStore };
  showStoreForm: boolean = false;
  showEditForm: boolean = false;
  showOwnershipForm: boolean = false;

  ngOnInit(): void {
    this.getAllStores();
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe((stores) => {
      this.stores = stores;
      this.filteredStores = stores;
      console.log(this.stores);
    });
  }

  toggleStoreForm() {
    this.showStoreForm = !this.showStoreForm;
  }

  createStore() {
    this.storeService.createStores(this.store).subscribe(() => {
      this.getAllStores();
      this.store = this.emptyStore;
    });
    this.showStoreForm = !this.showStoreForm;
  }
  deleteProduct(id?: string) {
    this.storeService.deleteStores(id).subscribe(() => {
      this.getAllStores();
    });
  }
  toggleEditForm(store: Store) {
    this.showEditForm = !this.showEditForm;
    this.editedStore = { ...store };
  }
  editProduct(store: Store, storeId?: string) {
    this.storeService.editStore(store, storeId).subscribe(() => {
      this.getAllStores();
      this.editedStore = this.emptyStore;
    });
    this.showEditForm = !this.showEditForm;
  }
  getStoresByKeyword() {
    if (this.keyword === undefined) {
      this.getAllStores();
    } else if (this.keyword.trim() == '') {
      this.getAllStores();
    } else {
      this.storeService.getStoresByKeyword(this.keyword).subscribe((stores) => {
        this.filteredStores = stores;
      });
    }
  }
  getStoresByCity() {
    if (this.cityKeyword === undefined) {
      this.getAllStores();
    } else if (this.cityKeyword.trim() == '') {
      this.getAllStores();
    } else {
      this.storeService
        .getStoresByCity(this.cityKeyword)
        .subscribe((stores) => {
          this.filteredStores = stores;
          console.log(this.filteredStores);
        });
    }
  }
  getStoresByCountry() {
    if (this.countryKeyword === undefined) {
      this.getAllStores();
    } else if (this.countryKeyword.trim() == '') {
      this.getAllStores();
    } else {
      this.storeService
        .getStoresByCountry(this.countryKeyword)
        .subscribe((stores) => {
          this.filteredStores = stores;
          console.log(this.filteredStores);
        });
    }
  }
  getStoresByMonthlyIncome() {
    this.storeService.getStoresByMonthlyIncome().subscribe((stores) => {
      this.filteredStores = stores;
    });
  }
}
