import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { job_contents } from '../../service/job-contents';
import { job_categories } from '../../service/job-categories';
import { Title, Meta } from '@angular/platform-browser';

const metaTags = [
  { name: 'Job Career | vaga pizzaiolo:site',
  content:"Vaga de Pizzailo; emprego de pizzaiolo no porto; trabalho para pizzaiolo no porto; trabalhar em pizzaria no porto; vaga para pizzeiro no Porto"
  }
];

@Component({
  selector: 'app-vaga-de-pizza',
  templateUrl: './vaga-de-pizza.component.html',
  styleUrls: ['./vaga-de-pizza.component.scss']
})
export class VagaDePizzaComponent {

  title = 'Job Career | vaga pizzaiolo Porto';
  description = "Vaga de Pizzailo; emprego de pizzaiolo no porto; trabalho para pizzaiolo no porto; trabalhar em pizzaria no porto; vaga para pizzeiro no Porto";

  jobs = job_contents;
  links = job_categories;
  jobSelected: any = [];
  showCategories = false;
  showCities = false;
  showJobsFound = false;
  isUnchanged = false;
  currentArtilce: string | any = "";

  categoryToSearch: string = '';
  cityToSearch: string = '';


  constructor(private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
    ){
      this.setSEOData(this.title, this.description)

  }

  blogPosts$: Observable<any> | undefined;

  ngOnInit(): void{

    this.route.paramMap.subscribe( ( param ) => {
      //var id = Number(param.get('id'));
      //this.removeAccount(id);
      this.currentArtilce = param.get('id');


      this.jobs.forEach(element => {
        if(element.hashKey == this.currentArtilce){
          this.jobSelected = element;
        }

      });

     })
  }

  setSEOData(title: string, description: string) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.addTags( metaTags , true);
  }

  applyCareer(){
    this.router.navigate(['/career/apply-now/'])
  }

  openJob(jobSelected: any){
    this.jobSelected = jobSelected
  }

  getPeriods(period: string){
    const array = period.split(";")
    return array;
  }

  onKeyUpCategory(e: any){
    if(e.target.value){
      this.showCategories = true
      this.categoryToSearch = e.target.value;
    }else{
      this.showCategories = false
      this.categoryToSearch = '';
    }
  }

  onKeyUpCity(e: any){
    if(e.target.value){
      this.showCities = true
      this.cityToSearch = e.target.value;
    }else{
      this.showCities = false
      this.cityToSearch = '';
    }
  }

  selectCategory(value: string | any){

    this.showCategories = false
    this.categoryToSearch = '';
  }

  selectCity(value: string | any){

    this.showCities = false
    this.cityToSearch = '';
  }

}




