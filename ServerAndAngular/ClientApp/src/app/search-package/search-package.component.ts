import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PackageDto, PackageWithProjectDto } from '../model/package';
import { PackagesService } from '../service/packages.service';

@Component({
  selector: 'app-search-package',
  templateUrl: './search-package.component.html',
  styleUrls: ['./search-package.component.css']
})
export class SearchPackageComponent implements OnInit {

  constructor(private packagesService: PackagesService,
    private toastr: ToastrService) { }

  /*
   * The columns to display
   * */
  displayedColumns: string[] = ['packageId', 'version', 'packageType', 'description', 'licence'];

  /**
   * Call when user tap "enter" in search text area
   * @param inputValue
   */
  OnEnter(inputValue: string) {
    if (inputValue.trim().length < 3) {
      this.toastr.warning("Il faut saisir au moins 3 caractères.", "Package");
      return;
    }
    this.packagesService.SearchPackage(inputValue).subscribe(result => this.packages = result)
  }

  /*
   * The id to search in database
   */
  idToSearch: string;

  /*
   * The last packages found
   */
  packages: PackageWithProjectDto[];

  ngOnInit(): void {
  }

}
