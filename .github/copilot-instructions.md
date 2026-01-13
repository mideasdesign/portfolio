# AI Coding Agent Instructions for Portfolio Project

## Project Overview
This is an **Angular 20** portfolio/personal website featuring:
- Responsive single-page application (SPA) with multiple sections (About, Projects, Skills, Contact, Testimonials)
- Bilingual support (English/German) using `@ngx-translate`
- Standalone components architecture (no NgModules)
- Tailwind CSS styling with PostCSS
- Static project data loaded from JSON
- Standalone development server running on `http://localhost:4200/`

**Key Tech Stack:**
- Angular 20.3.14 (latest standalone API)
- TypeScript 5.9.3 with strict mode enabled
- Tailwind CSS 4.1.10 + PostCSS
- RxJS 7.8
- @ngx-translate/core (i18n)
- Jasmine/Karma for testing

## Architecture & Component Structure

### Routing Structure (`src/app/app.routes.ts`)
Simple flat routing with 4 main routes:
- `/` → MainComponent (homepage with all sections)
- `/imprint` → ImprintComponent (legal)
- `/privacy` → PrivacyComponent (legal)
- `/more-projects` → MoreProjectsComponent

**Pattern:** No lazy loading currently. All routes import components directly.

### Component Hierarchy
```
AppComponent (root)
├── HeaderComponent (navigation, language switcher)
├── RouterOutlet (primary route content)
└── FooterComponent

MainComponent (homepage)
├── NavComponent (internal navigation)
├── AboutMeComponent
├── SkillsComponent
├── ProjectsComponent (tabbed: Join, ElPollo, Pokédex)
├── TestimonialsComponent
└── ContactComponent
```

### Shared Components & Services
- **HeaderComponent** - Navigation & language switcher
- **FooterComponent** - Footer with links
- **NavComponent** - Scroll navigation within MainComponent
- **LanguageService** (`src/app/shared/services/language.service.ts`) - Centralized i18n management
- **ProjectsService** - Loads projects from `src/assets/data/projects.json`

## Critical Development Workflows

### Starting Development
```bash
npm start
# Runs: ng serve (development server on http://localhost:4200/)
# Hot reload enabled - changes auto-reload in browser
```

### Building for Production
```bash
npm build
# Output: dist/portfolio/
# Production build with source maps disabled, output hashing enabled
```

### Running Tests
```bash
npm test
# Runs Karma/Jasmine test suite
# Watch mode enabled by default
```

## Project-Specific Patterns & Conventions

### 1. **Standalone Components Pattern (No NgModules)**
All components use Angular 20's standalone API:
```typescript
@Component({
  selector: 'app-name',
  imports: [TranslateModule, CommonModule, OtherComponents],  // Explicit imports required
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent {}
```
**Why:** Reduces bundle size, simpler mental model, explicit dependencies.

### 2. **Signals for Reactive State**
Used in `MainComponent` for UI state management:
```typescript
showMobileMenu = signal(false);
showScrollButton = signal(false);

// Update in methods:
this.showMobileMenu.set(!this.showMobileMenu());
```
**Why:** Simpler than RxJS for component-local state, better change detection.

### 3. **i18n with @ngx-translate**
**Language initialization** happens in `LanguageService.initializeLanguage()`:
- Detects browser language
- Falls back to localStorage if set
- Validates against whitelist: `['en', 'de']`
- Default: English

**Usage in templates:**
```html
<h1>{{ 'main.title' | translate }}</h1>
```

**Adding new strings:** Edit `src/assets/i18n/en.json` and `de.json` with nested keys like:
```json
{
  "section": {
    "key": "Translation text"
  }
}
```

### 4. **Projects Data Management**
Projects are defined in `src/assets/data/projects.json` with keys (not text):
```json
{
  "titleKey": "projects.join.title",
  "aboutTitleKey": "projects.join.about.title",
  "image": "./assets/images/...",
  "liveUrl": "https://...",
  "githubUrl": "https://..."
}
```
Injected via `ProjectsService` - accessed as `ProjectsService.projects` array.

### 5. **CSS: Tailwind + Component Scoped Styles**
- Global Tailwind utility classes in `src/styles.css`
- Component-scoped CSS in `component.css` files
- **No SCSS/SASS** - plain CSS files only
- Tailwind configuration: PostCSS-based (4.1.10)

### 6. **Type Safety & Linting**
- TypeScript strict mode enabled (`strict: true`)
- `noImplicitReturns: true` - all functions must return value
- `noPropertyAccessFromIndexSignature: true` - strict property access
- ESLint not visible in config - likely using Angular defaults

## File Organization Rules

- **Component files**: Always create triples: `.ts`, `.html`, `.css`, `.spec.ts`
- **Example**: `src/app/main/projects/projects.component.*`
- **Services**: Placed in `src/app/shared/services/` with `@Injectable({ providedIn: 'root' })`
- **Assets**: Images in `src/assets/images/`, i18n in `src/assets/i18n/`

## Testing Patterns

Components have `.spec.ts` files using Jasmine:
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName]
    }).compileComponents();
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
**Note:** Some components (AboutMe, etc.) have spec files but may need real tests.

## Known Workflow Commands
- `npm run ng -- generate component path/component-name` - Scaffold new component
- `npm run watch` - Build in watch mode (for production testing)
- `ng build --configuration=production` - Explicit production build

## Performance & Build Budgets
From `angular.json`:
- Initial bundle: **500KB warning** / 1MB error
- Component styles: **2KB warning** / 4KB error

Keep component CSS minimal - use Tailwind utilities in templates instead.

## Adding New Features: Checklist
1. Create component in appropriate section: `ng generate component path/component-name`
2. If it needs translations: Add keys to `en.json` and `de.json`
3. If it needs test: Ensure `.spec.ts` has real test coverage (not just `should create`)
4. If it's a shared service: Place in `src/app/shared/services/` with root injection
5. Update routing in `app.routes.ts` if adding top-level page
6. Import component in parent: Update parent's `imports` array

## Debugging Tips
- **Language not switching?** Check `LanguageService.switchLanguage()` - verify localStorage is being set
- **Translation missing?** Ensure key exists in both `en.json` AND `de.json`
- **Component not showing?** Verify it's imported in parent component's `imports` array
- **Styles not applying?** Check for conflicting Tailwind utilities or CSS specificity in component CSS
