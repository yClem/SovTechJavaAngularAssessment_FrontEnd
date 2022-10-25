import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-rest',
  templateUrl: './dashboard-rest.component.html',
  styleUrls: ['./dashboard-rest.component.css']
})

export class DashboardRestComponent implements OnInit {
  personsForm: FormGroup;
  persons: any[] = [];
  person: any;
  loading: boolean = false;
  searching: boolean = false;
  submitted: boolean = false;

  /**
   * Pagination properties
   */
  size: number = 2;
  page: number = 0;
  totalPages: number;
  totalElements: number;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initializeFormAndGetPersons();
  }

  /**
   * Initialize form && get persons
   */
  initializeFormAndGetPersons() {
    this.personsForm = this.formBuilder.group({
      searchText: ['', Validators.required],
    });
    this.getPersons();
  }

  getPersons() {
    this.loading = true;
    this.dashboardService.findPersons(this.page, this.size).subscribe((response) => {
      this.persons = response.content;
      this.page = response.number;
      this.size = response.size;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.loading = false;
    }, err => {
      this.loading = false;
      /**
       * Handle Error
       */
    });
  }

  /**
   * Search persons by name
   */
  onSubmit() {
    this.submitted = true;

    if (this.personsForm.invalid) {
      return;
    }

    this.findPersonByName(this.personsForm.value.searchText);
  }

  /**
   * Search persons i.e. for simplicity. I am simply finding the person by his/her name.
   */
  findPersonByName(name: string) {
    this.resetPagination();

    this.searching = true;
    this.persons = [];

    this.dashboardService.findPersonByName(name, this.page, this.size).subscribe((response) => {
      this.persons = response.content;
      this.page = response.number;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.size = response.size;
      this.searching = false;
    }, err => {
      this.searching = false;
      /**
       * Handle Error
       */
    });
  }

  /**
   * Clear search
   */
  clearSearch() {
    this.personsForm.reset();
    this.submitted = false;
    this.resetPagination();
    this.getPersons()
  }

  /**
   * Page change event.
   */
  pageChange(page: number) {
    this.page = page - 1;
    this.getPersons();
  }

  resetPagination() {
    /**
     * Inialize page/size to default i.e. 0,20 in this case.
     */
    this.page = 0;
    this.size = 2;
  }

  /**
   * View client dfetails i.e. in depth.
   * Filter persons list.
   */
  open(personInfo: any, personId: number) {
    this.person = this.persons.filter(p => p.id == personId)[0];
    this.modalService.open(personInfo, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //
      },
      (reason) => {
        //
      },
    );
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  /**
   * Get persons form
   */
  get pf(): { [key: string]: AbstractControl; } {
    return this.personsForm.controls;
  }


}

