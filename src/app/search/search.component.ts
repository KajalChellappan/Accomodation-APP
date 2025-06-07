import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() actionBtnClicked = new EventEmitter<String>();

  constructor(private router: Router, private jwtService: JwtService) {}
  search: String = '';
  userRole = '';
  ngOnInit(): void {
    //   this.filteredOptions = this.myControl.valueChanges.pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //  );
    this.userRole = this.jwtService.userRole;
  }
  addCard(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  // searchControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }

  searchCompartmets(searchInput: string) {
    console.log(searchInput, 'search value');
  }

  emitActionBtnClicked(searchInput: String) {
    this.actionBtnClicked.emit(searchInput);
  }

  getUserRole() {}
}
