import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { gql } from 'apollo-angular';

interface IPerson {
  person: {
    id: number
    name: string
    height: string
    mass: string
    gender: string
    homeworld: string
  }
  size: number
  number: number;
  numberOfElements: number;
  totalPages: number
  totalElements: number
}

@Component({
  selector: 'app-dashboard-graphql',
  templateUrl: './dashboard-graphql.component.html',
  styleUrls: ['./dashboard-graphql.component.css']
})
export class DashboardGraphqlComponent implements OnInit {
  personsForm: FormGroup;

  persons: any[];
  person: any;

  loading: boolean = false;
  searching: boolean = false;
  submitted: boolean = false;

  /**
   * Pagination properties
   */
  number: number = 0;
  size: number = 2;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;

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
    let query = gql`
    query{
      persons(page:${this.number}, size:${this.size}){
        person{
            id
            name
            height
            mass
            gender
            homeworld
        }
        size
        number
        totalPages
        totalElements
      }
    }
    `
    this.dashboardService.executeQuery(query).subscribe((response) => {
      this.persons = response.data.persons.person;
      this.setPaging(response.data.persons);
      this.loading = false;
    }, err => {
      this.loading = false;
      /**
       * Handle Error
       */
    });
  }

  setPaging(data: any) {
    this.number = data.number;
    this.size = data.size;
    this.numberOfElements = data.numberOfElements;
    this.totalElements = data.totalElements;
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

    let query = gql`
    query{
      findPersonByName(name:"${name}", page:${this.number}, size:${this.size}){
        person{
            id
            name
            height
            mass
            gender
            homeworld
        }
        size
        number
        totalPages
        totalElements
        numberOfElements
      }
    }
    `
    this.dashboardService.executeQuery(query).subscribe((response) => {
      this.persons = response.data.findPersonByName.person;
      this.setPaging(response.data.findPersonByName);
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
  pageChange(number: number) {
    this.number = number - 1;
    this.getPersons();
  }

  resetPagination() {
    /**
     * Inialize page/size to default i.e. 0,20 in this case.
     */
    this.number = 0;
    this.size = 2;
  }

  /**
   * View client dfetails i.e. in depth.
   */
  open(personInfo: any, personId: number) {
    this.findPersonById(personId, personInfo);
  }

  findPersonById(id: number, personInfo: any) {
    this.resetPagination();

    this.searching = true;
    let query = gql`
    query{
      findPersonById(id:${id}){
        name
        height
        mass
        hair_color
        skin_color
        eye_color
        birth_year
        gender
        homeworld
        films
        species
        vehicles
        starships
        created
        edited
        url
      }
    }
    `
    this.dashboardService.executeQuery(query).subscribe((response) => {
      this.person = response.data.findPersonById;
      this.searching = false;
      this.modalService.open(personInfo, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          //
        },
        (reason) => {
          //
        },
      );
    }, err => {
      this.searching = false;
      /**
       * Handle Error
       */
    });
  }

  /**
   * Get persons form
   */
  get pf() {
    return this.personsForm.controls;
  }


}

