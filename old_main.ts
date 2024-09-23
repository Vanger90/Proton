import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

var x = true;
var background_default = 56;


export default class Proton extends Plugin {
	
	settings: ProtonSettings;
	

	async onload() {
		
		/*document.documentElement.style
		.setProperty('--background_light', '#f5f5f5'); */
	
	  // load settings
	  await this.loadSettings();
  
	  // add the settings tab
	  this.addSettingTab(new ProtonSettingTab(this.app, this));
	  // add the toggle on/off command
	  
	  /*console.log(this.settings.lightScheme);*/  /* список */
		

	    if(this.settings.lightScheme == 'classic-bg'){
			document.documentElement.style.setProperty('--background_light', '#f5f5f5');
			document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');

			document.documentElement.style.setProperty('--background_dark', '#272b34');
			document.documentElement.style.setProperty('--color-text-dark', '#cfcfcf'); /* cfcfcf */ 

			document.documentElement.style.setProperty('--soft-color', '#eeeeee');
			document.documentElement.style.setProperty('--flag_Light', '0%');

			document.documentElement.style.setProperty('--text-muted-light',      '#333');
			document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
			document.documentElement.style.setProperty('--text-muted-dark',       '#888');
			document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
		}

		if(this.settings.lightScheme == 'soft-bg'){
			document.documentElement.style.setProperty('--background_light', '#fcf5e4');
			document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');

			document.documentElement.style.setProperty('--background_dark', '#262626');  /* 2a241d */ 
			document.documentElement.style.setProperty('--color-text-dark', '#a69e90 ');  /*a69e90 cabda7  cfcfcf*/ 

			document.documentElement.style.setProperty('--soft-color', '#fcf5e4');
			document.documentElement.style.setProperty('--flag_Light', '0%');

			document.documentElement.style.setProperty('--text-muted-light',      '#333');
			document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
			document.documentElement.style.setProperty('--text-muted-dark',       '#888');
			document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
		}

		if(this.settings.lightScheme == 'dark-soft-bg'){
			document.documentElement.style.setProperty('--background_light', '#fcf5e4');
			document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');

			document.documentElement.style.setProperty('--background_dark', '#272b34');  /* 2a241d */ 
			document.documentElement.style.setProperty('--color-text-dark', '#cfcfcf');
			
			document.documentElement.style.setProperty('--soft-color', '#fcf5e4');
			document.documentElement.style.setProperty('--flag_Light', '0%');

			document.documentElement.style.setProperty('--text-muted-light',      '#333');
			document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
			document.documentElement.style.setProperty('--text-muted-dark',       '#888');
			document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
		}	

		if(this.settings.lightScheme == 'light-bg'){
			document.documentElement.style.setProperty('--background_light', '#f5f5f5');
			document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');

			document.documentElement.style.setProperty('--background_dark', '#fcf5e4');  /* 2a241d */ 
			document.documentElement.style.setProperty('--color-text-dark', '#0d0d0d');
			
			document.documentElement.style.setProperty('--soft-color', '#eeeeee');
			document.documentElement.style.setProperty('--flag_Light', '100%');

			document.documentElement.style.setProperty('--text-muted-light',      '#333');
			document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
			document.documentElement.style.setProperty('--text-muted-dark',       '#333');
			document.documentElement.style.setProperty('--text-color-tabs-dark',  '#555');
		}	
		
		document.documentElement.style.setProperty('--f-color',           this.settings.scolor * 100 );
		document.documentElement.style.setProperty('--light-color',       this.settings.bcolor );
		document.documentElement.style.setProperty('--modifier-border-f', this.settings.modifier_border );
		
	    /*this.refresh();*/
	
	}
  
	
	onunload() {
		console.log('Unloading Hider plugin');
		
		this.removeLightScheme();  /* список */
	}
	
	async loadSettings() {
		this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
	await this.saveData(this.settings);
	}

	// refresh function for when we change settings
	refresh = () => {
	// re-load the style
	this.updateStyle()
	}


  
	// update the styles (at the start, or as the result of a settings change)
	
	updateStyle = () => {
		
		
	  document.body.classList.toggle('hider-status', this.settings.modifier_border);
	  	    
	  document.body.addClass(
		this.settings.lightScheme,  /* список */
	  );

	}






	interface ProtonSettings {
		modifier_border: boolean;
		lightScheme: string;
		scolor: number;
		bcolor: number;	
	}
	    const DEFAULT_SETTINGS: ProtonSettings = {
		
		modifier_border: true,
		lightScheme: 'classic-bg',
		scolor: 0.0,
		bcolor: 0.1
	}	 



	updateLightScheme() {
		this.removeLightScheme();
		document.body.addClass(this.settings.modifier_border);
	}

	removeLightScheme() {   /* список */
		document.body.removeClass(
		  'classic-bg',
		  'soft-bg',
		  'dark-soft-bg',
		  'light-bg',
		);
	}


	changeScolor = (newValue: number = 0.25) => {
		this.settings.scolor = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}
	
	changeBcolor = (newValue: number = 0.25) => {
		this.settings.bcolor = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}
  
  

  
 
  class ProtonSettingTab extends PluginSettingTab {
  
  
	plugin: Proton;
	constructor(app: App, plugin: Proton) {
	  super(app, plugin);
	  this.plugin = plugin;
	}
  
	

	display(): void {
	  let {containerEl} = this;
	  
	  
	  
	  containerEl.empty();
   
		new Setting(containerEl)
			.setName('Hide status bar')
			.setDesc('Hides word count, character count and backlink count.')
			.addToggle(toggle => toggle.setValue(this.plugin.settings.modifier_border)

				.onChange((value) => {
				this.plugin.settings.modifier_border = value;
				this.plugin.saveData(this.plugin.settings);
				this.plugin.refresh();
					
				if(this.plugin.settings.modifier_border == true) {document.documentElement.style.setProperty('--modifier-border-f', '100%');} 
				else                                             {document.documentElement.style.setProperty('--modifier-border-f', '0%');}
		}) 
		);
			
	  new Setting(containerEl)

		.setName('BackGround')
        .setDesc('Preset color options for light mode.')
        .addDropdown(dropdown => dropdown
          .addOption('classic-bg',    'Classic')
          .addOption('soft-bg',       'Soft')
		  .addOption('dark-soft-bg',  'DarkSoft')
		  .addOption('light-bg',      'Light')
          /*.addOption('light-bg','Light')*/
          .setValue(this.plugin.settings.lightScheme)
		  
        .onChange((value) => {
          this.plugin.settings.lightScheme = value;
          this.plugin.saveData(this.plugin.settings);
		  this.plugin.updateLightScheme();
		  this.plugin.refresh();

			if(this.plugin.settings.lightScheme == 'classic-bg'){
				document.documentElement.style.setProperty('--background_light', '#f5f5f5');
				document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');

				document.documentElement.style.setProperty('--background_dark', '#272b34');
				document.documentElement.style.setProperty('--color-text-dark', '#cfcfcf');

				document.documentElement.style.setProperty('--soft-color', '#eeeeee');
				document.documentElement.style.setProperty('--flag_Light', '0%');

				document.documentElement.style.setProperty('--text-muted-light',      '#333');
				document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
				document.documentElement.style.setProperty('--text-muted-dark',       '#888');
				document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
			}

			if(this.plugin.settings.lightScheme == 'soft-bg'){
				document.documentElement.style.setProperty('--background_light', '#fcf5e4');
				document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');

				document.documentElement.style.setProperty('--background_dark', '#262626');  /* 2a241d */ 
				document.documentElement.style.setProperty('--color-text-dark', '#a69e90');  /* a69e90 cabda7  cfcfcf*/ 

				document.documentElement.style.setProperty('--soft-color', '#fcf5e4');
				document.documentElement.style.setProperty('--flag_Light', '0%');

				document.documentElement.style.setProperty('--text-muted-light',      '#333');
				document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
				document.documentElement.style.setProperty('--text-muted-dark',       '#888');
				document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
			}

			if(this.plugin.settings.lightScheme == 'dark-soft-bg'){
				document.documentElement.style.setProperty('--background_light', '#fcf5e4');
				document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');
	
				document.documentElement.style.setProperty('--background_dark', '#272b34');  /* 2a241d */ 
				document.documentElement.style.setProperty('--color-text-dark', '#cfcfcf');
				
				document.documentElement.style.setProperty('--soft-color', '#fcf5e4');
				document.documentElement.style.setProperty('--flag_Light', '0%');

				document.documentElement.style.setProperty('--text-muted-light',      '#333');
				document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
				document.documentElement.style.setProperty('--text-muted-dark',       '#888');
				document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
			}	
			

			if(this.plugin.settings.lightScheme == 'light-bg'){
				document.documentElement.style.setProperty('--background_light', '#f5f5f5');
				document.documentElement.style.setProperty('--color-text-light', '#0d0d0d');
	
				document.documentElement.style.setProperty('--background_dark', '#fcf5e4');  /* 2a241d */ 
				document.documentElement.style.setProperty('--color-text-dark', '#0d0d0d');
				
				document.documentElement.style.setProperty('--soft-color', '#eeeeee');
				document.documentElement.style.setProperty('--flag_Light', '100%');

				document.documentElement.style.setProperty('--text-muted-light',      '#333');
				document.documentElement.style.setProperty('--text-color-tabs-light', '#555');
				document.documentElement.style.setProperty('--text-muted-dark',       '#333');
				document.documentElement.style.setProperty('--text-color-tabs-dark',  '#555');
			}	

		        
        })	
		);

		new Setting(containerEl)
		.setName("Second Color")
		.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(0, 18, 1)
			.setValue(this.plugin.settings.scolor * 100)
			.onChange((newValue) => { this.plugin.changeScolor(newValue / 100) 
			document.documentElement.style.setProperty('--f-color', newValue); 
			console.log(newValue);
		})
		);

		new Setting(containerEl)
		.setName("Bright")
		.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(0, 7, 0.5)
			.setValue(this.plugin.settings.bcolor * 100)
			.onChange((newValue) => { this.plugin.changeBcolor(newValue / 100) 
			document.documentElement.style.setProperty('--light-color', newValue / 100); 
			console.log(newValue/100);
		})
		);		
			
					
		/*console.log(this.plugin.settings.typewriterOffset);*/
			
	
	}


}
  




