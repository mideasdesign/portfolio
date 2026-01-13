import { Component, OnInit, AfterViewInit, OnDestroy, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../shared/nav/nav.component';
import { RouterModule } from '@angular/router';
import { ProjectsService } from '../shared/services/projects.service';
import { Project } from '../main/projects/project';
import { LightgalleryModule } from 'lightgallery/angular';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lightGallery from 'lightgallery';
import { LightGallery } from 'lightgallery/lightgallery';

@Component({
    selector: 'app-more-projects',
    standalone: true,
    imports: [
        CommonModule,
        TranslatePipe,
        NavComponent,
        RouterModule,
        LightgalleryModule,
    ],
    templateUrl: './more-projects.components.html',
    styleUrls: ['./more-projects.components.css'],
})
export class MoreProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
    projects: Project[] = [];

    @ViewChildren('lightgallery') galleryElements!: QueryList<ElementRef>;

    private lightGalleryInstances: LightGallery[] = [];

    settings = {
        counter: false,
        plugins: [lgZoom, lgThumbnail],
    };

    constructor(
        private projectsService: ProjectsService,
    ) {}

    ngOnInit() {
        this.projects = this.projectsService.projects as Project[];
    }

    ngAfterViewInit(): void {
        this.galleryElements.changes.subscribe(() => {
            this.initLightGalleries();
        });
        // Initial call
        this.initLightGalleries();
    }

    initLightGalleries(): void {
        this.destroyLightGalleries();
        this.galleryElements.forEach((galleryElement, index) => {
            const project = this.projects[index];
            if (project && project.images) {
                const dynamicEl = project.images.map(img => ({ src: img, thumb: img }));
                const instance = lightGallery(galleryElement.nativeElement, {
                    ...this.settings,
                    dynamic: true,
                    dynamicEl: dynamicEl,
                });
                this.lightGalleryInstances.push(instance);
            }
        });
    }

    openGallery(index: number): void {
        if (this.lightGalleryInstances[index]) {
            this.lightGalleryInstances[index].openGallery(0);
        }
    }

    destroyLightGalleries(): void {
        this.lightGalleryInstances.forEach(instance => {
            if (instance) {
                instance.destroy();
            }
        });
        this.lightGalleryInstances = [];
    }

    ngOnDestroy(): void {
        this.destroyLightGalleries();
    }
}
