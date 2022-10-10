import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
// import { RecipeModel } from './recipe-dash.board.model';
import { RecipeModel } from '../interfaces/recipe-model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-dashboard',
  templateUrl: './recipe-dashboard.component.html',
  styleUrls: ['./recipe-dashboard.component.scss'],
})
export class RecipeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  maximumDescriptionSize: number = 16;
  recipeModelObj: RecipeModel = new RecipeModel();
  recipeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      source: [''],
      ingredients: [''],
      quantity: [''],
      description: [''],
    });
    this.getAllRecipe();
  }
  clickAddedRecipe() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postRecipeDetails() {
    this.recipeModelObj.firstName = this.formValue.value.firstName;
    this.recipeModelObj.source = this.formValue.value.source;
    this.recipeModelObj.ingredients = this.formValue.value.ingredients;
    this.recipeModelObj.quantity = this.formValue.value.quantity;
    this.recipeModelObj.description = this.formValue.value.description;

    this.api.postRecipe(this.recipeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Recipe added sucessfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllRecipe();
      },
      (err) => {
        alert('something want wrong');
      }
    );
  }

  getAllRecipe() {
    this.api.getRecipe().subscribe((res) => {
      this.recipeData = res;
    });
  }
  deleteRecipe(row: any) {
    this.api.deleteRecipe(row.id).subscribe((res) => {
      alert('Recipe deleted');

      this.getAllRecipe();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.recipeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['source'].setValue(row.source);
    this.formValue.controls['ingredients'].setValue(row.ingredients);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['description'].setValue(row.description);
  }
  updateRecipeDetails() {
    this.recipeModelObj.firstName = this.formValue.value.firstName;
    this.recipeModelObj.source = this.formValue.value.source;
    this.recipeModelObj.ingredients = this.formValue.value.ingredients;
    this.recipeModelObj.quantity = this.formValue.value.quantity;
    this.recipeModelObj.description = this.formValue.value.description;

    this.api.updateRecipe(this.recipeModelObj, this.recipeModelObj.id);

    this.api
      .updateRecipe(this.recipeModelObj, this.recipeModelObj.id)
      .subscribe((res) => {
        alert('updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllRecipe();
      });
  }
}
