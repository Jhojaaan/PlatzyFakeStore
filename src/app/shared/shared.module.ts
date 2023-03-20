import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from './services/categories.service';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    ButtonModule,
  ],
  exports: [FiltersComponent],
  providers: [CategoriesService],
})
export class SharedModule {}
