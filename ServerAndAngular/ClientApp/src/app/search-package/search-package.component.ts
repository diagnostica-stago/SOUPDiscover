import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PackageDto } from '../model/package';
import { PackageWithProjectDto } from '../model/packageWithProjectDto';
import { PackagesService } from '../service/packages.service';

@Component({
  selector: 'app-search-package',
  templateUrl: './search-package.component.html',
  styleUrls: ['./search-package.component.css']
})
export class SearchPackageComponent implements OnInit {

  constructor(private packageService: PackagesService,
    private toastr: ToastrService) { }

  /*
   * The columns to display
   * */
  displayedColumns: string[] = ['packageId', 'version', 'packageType', 'description', 'license', 'projects'];

  /*
   * The package id to search in database
   */
  idToSearch: string;

  /*
   * The last packages found
   */
  packages: PackageWithProjectDto[];

  /**
   * Call when user tap "enter" in search text area
   * @param inputValue
   */
  OnEnter(inputValue: string) {
    if (inputValue.trim().length < 3) {
      this.toastr.warning("Il faut saisir au moins 3 caractères.", "Package");
      return;
    }
    this.idToSearch = inputValue;
    this.packageService.SearchPackage(inputValue)
      .subscribe(
        result => this.packages = result,
        error => this.HandleError(error)
      );
  }

  /**
   * Return the url of the csv file that contains all package in all projects where package id contains this.idToSearch.
   * */
  GetCsvUrlFromId() {
    return this.packageService.GetCsvUrlFromId(this.idToSearch);
  }

  /**
   * Return the url, that permit to read or download the license content
   * @param packageElement The package
   */
  GetContentLicenseUrl(packageElement: PackageDto): string {
    return this.packageService.GetContentLicenseUrl(packageElement.id);
  }

  /**
   * Return the url, that contains information about this type of license
   * @param packageElement The package
   */
  GetExpressionLicenseUrl(packageElement: PackageDto): string {
    return this.packageService.GetExpressionLicenseUrl(packageElement.license);
  }

  ngOnInit(): void {
  }

  /**
   * Display error to user
   * @param error the error to display
   */
  HandleError(error: HttpErrorResponse): void {
    this.toastr.error(error.error.detail, 'Dépot');
  }
}
