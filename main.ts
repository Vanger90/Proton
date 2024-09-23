import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface ProtonSettings {
	lightScheme: string;
	darkt: number;
	softdark: boolean;
	sdarkt: boolean;
	slarkt: boolean;
	colorheaders: boolean;
	
	accent: number;
	accentplus: boolean;
	
	ColorDarkText:string; 
	serifswitch: boolean;
	sizetext: number;
	spacing_paragraphs: boolean;
	justified: boolean;
	
	lighthed: boolean;


	powercorrection: number;
	powercorrection_d: number;
	RGBcorrection: number;
	softL: boolean;

	wide_text: boolean;

	soft_per: string; 

	fresh_dark: number;
	
}


const DEFAULT_SETTINGS: ProtonSettings = {
	
	lightScheme: 'classic-bg',
	darkt:  3,
	softdark: false,
	sdarkt: false,
	slarkt: false,
	colorheaders: false,
	
	accent: 11,
	accentplus: false,
	
	ColorDarkText: 'default-color-dark',
	serifswitch: false,
	sizetext: 0.6,
	spacing_paragraphs: true,
	justified: false,
	
	lighthed: false,

	
	powercorrection:   2.5,
	powercorrection_d: 2.5,
	RGBcorrection: 0.02,
	softL: false,

	wide_text: false,

	soft_per: '38%',

	fresh_dark: 40,
}



export default class MyPlugin extends Plugin {
	settings: ProtonSettings;


		/*  
			Segoe UI				Sego                1         1.1  
		    Calibri					Calibr              1.09375   1
			Merriweather			Merri               0.89      1.3
			setFontLight   setFontDark
		   	
		НЕ ИСПОЛЬЗУЮТСЯ
			Verdana 				Verdan              0.90625   1.21
			TT Marxiana Grotesque	Marxiana Bold       1.1       1.1    жирный и узкий
			Marck Script			Hand            	1.28      1.05   рукописный
			TT Marxiana Elzevir		Marxiana Elzevir    1.0325    1.06   очень тонкий и широкий Serif
			Comic Sans MS			Comic               0.96875   1.14
          	TT Jenevers				Jenevers            0.96875   1.13   старый Serif

			 коэф для масштабирования шрифта    И    коэф для масштабирования межстрочного растояния
        */

	
		/*
			this.plugin.setFont_Calibri_Light();
			this.plugin.setFont_Merri_Light();
			this.plugin.setFont_SegoeUI_Dark();
			this.plugin.setFont_Calibri_Dark();
		*/
	
		
	setFont_Calibri_Light(){  /*  Comic  0.96875  Merri  1.00 */
		
		document.documentElement.style.setProperty('--font-family-font-light',   'Calibr');   
		document.documentElement.style.setProperty('--font-size-light-k',       '1.09375');
		document.documentElement.style.setProperty('--line-height-k-light',        '1.05');

		document.documentElement.style.setProperty('--font-h1-light',             'Sego');
		document.documentElement.style.setProperty('--font-size-h1-light',     '1.08');
	}

	setFont_Merri_Light(){
		
		document.documentElement.style.setProperty('--font-family-font-light',  'Camb');  /* Merri   0.89   1.3*/  
		document.documentElement.style.setProperty('--font-size-light-k',       '1.07');   
		document.documentElement.style.setProperty('--line-height-k-light',      '1.10');  

		document.documentElement.style.setProperty('--font-h1-light',             'Camb');
		document.documentElement.style.setProperty('--font-size-h1-light',         '1.115');
	}

	setFont_SegoeUI_Dark(){
		
		document.documentElement.style.setProperty('--font-family-font-dark',  'Calibr');   
		document.documentElement.style.setProperty('--font-size-dark-k',          '1.09375');
		document.documentElement.style.setProperty('--line-height-k-dark',      '1'); 
		
		document.documentElement.style.setProperty('--font-h1-dark',             'Sego');
		document.documentElement.style.setProperty('--font-size-h1-dark',     '1.08');
	}

	setFont_Calibri_Dark(){
		
		document.documentElement.style.setProperty('--font-family-font-dark',  'Calibr');   
		document.documentElement.style.setProperty('--font-size-dark-k',       '1.09375');
		document.documentElement.style.setProperty('--line-height-k-dark',        '1'); 

		document.documentElement.style.setProperty('--font-h1-dark',             'Merri');
		document.documentElement.style.setProperty('--font-size-h1-dark',     '1'); 
	}

	setFont_Merri_Dark(){ // SegoeUI  Calibri  Merri   
		
		document.documentElement.style.setProperty('--font-family-font-dark',  'Merri');   
		document.documentElement.style.setProperty('--font-size-dark-k',       '0.89');
		document.documentElement.style.setProperty('--line-height-dark',       '1.3');  
	}

	

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ProtonTab(this.app, this));
		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			/*console.log('click', evt);*/
		});
		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		/*this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));*/
		
		/*console.log(this.settings.modifie_border);*/


		
		//document.documentElement.style.setProperty('--accent-numb',       this.settings.accent * 100);
		document.documentElement.style.setProperty('--set-font-size',     this.settings.sizetext * 100 );

		document.documentElement.style.setProperty('--persent-soft-p',      this.settings.powercorrection * 100);
		document.documentElement.style.setProperty('--persent-soft-p-dark', this.settings.powercorrection_d * 100);
			
		if (this.settings.accentplus) document.documentElement.style.setProperty('--accent-plus',  '100%');
		else                          document.documentElement.style.setProperty('--accent-plus',  '0%');

		if (this.settings.serifswitch) this.setFont_Merri_Light();
		else                           this.setFont_Calibri_Light(); 

		if (this.settings.spacing_paragraphs) document.documentElement.style.setProperty('--word-mode', '1');
		else                                  document.documentElement.style.setProperty('--word-mode', '0');

		if (this.settings.spacing_paragraphs) document.documentElement.style.setProperty('--padding-wm', '55px');
		else                                  document.documentElement.style.setProperty('--padding-wm', '32px');

		if (this.settings.justified)          document.documentElement.style.setProperty('--text-align-k', 'justify');
		else                                  document.documentElement.style.setProperty('--text-align-k', 'left');

	



		if (this.settings.slarkt)   {
			document.documentElement.style.setProperty('--background_light', '#fcf5e4');  // f0f0f0 fcf5e4
			document.documentElement.style.setProperty('--soft-color',       '#fcf5e4');
		}
		else{
			document.documentElement.style.setProperty('--background_light', '#f0f0f0');  // f0f0f0 fcf5e4
			document.documentElement.style.setProperty('--soft-color',       '#f0f0f0');
		}




		this.setFont_SegoeUI_Dark();
			
		if (this.settings.serifswitch) this.setFont_Merri_Light();
		else                           this.setFont_Calibri_Light(); 

		document.documentElement.style.setProperty('--color-text-light',   '#333333');
		document.documentElement.style.setProperty('--text-muted-light',      '#333'); // цвет текста слева
		document.documentElement.style.setProperty('--text-color-tabs-light', '#555'); // текст на вкладках

		document.documentElement.style.setProperty('--text-muted-dark',       '#888');
		document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
		document.documentElement.style.setProperty('--flag_Light',              '0%');

		document.documentElement.style.setProperty('--f-gray',           '1');  //  1-цветной   0-серый
		
		document.documentElement.style.setProperty('--accent-color-f',  '1');

		document.documentElement.style.setProperty('--fresh_dark-text', this.settings.fresh_dark * 100);
		

		if (this.settings.softdark){

			document.documentElement.style.setProperty('--color-text-dark-p',  '#7a766d');
			document.documentElement.style.setProperty('--accent-color-f',       '0');
		}
		else{
				document.documentElement.style.setProperty('--color-text-dark-p',  '#919191');
				document.documentElement.style.setProperty('--accent-color-f',  '1');
		}


		document.documentElement.style.setProperty('--header-gray',  '100%');

		if (this.settings.darkt == 0.01){
				
			document.documentElement.style.setProperty('--background_dark', '#212121');  
			document.documentElement.style.setProperty('--f-gray', '0');

			document.documentElement.style.setProperty('--color-text-dark-p',  '#919191');
			document.documentElement.style.setProperty('--accent-color-f',  '0');

			document.documentElement.style.setProperty('--correct-color-header',  "0%");
			
			if(this.settings.colorheaders) document.documentElement.style.setProperty('--header-gray', '100%');
			else                           document.documentElement.style.setProperty('--header-gray', '0%');
            
            /*
			document.documentElement.style.setProperty('--f-gray', '0'); 

			document.documentElement.style.setProperty('--background_dark', '#212121');   
			document.documentElement.style.setProperty('--f-color',                2);

			document.documentElement.style.setProperty('--accent-numb',        3);
			document.documentElement.style.setProperty('--correct-accent',  '32%');

			document.documentElement.style.setProperty('--correct-color-header',  "25%"); // 15
			*/
		}

		if (this.settings.darkt == 0.02){
			
			document.documentElement.style.setProperty('--background_dark', '#211f1b');  /*  желтый  */  
			document.documentElement.style.setProperty('--f-color',                2);

			document.documentElement.style.setProperty('--accent-numb',        3);
			document.documentElement.style.setProperty('--correct-accent',  '32%');

			document.documentElement.style.setProperty('--correct-color-header',  "15%");
		}	

		if (this.settings.darkt == 0.03){
			
			document.documentElement.style.setProperty('--background_dark', '#1b2120');  /*  зеленый  */  
			document.documentElement.style.setProperty('--f-color',                8);

			document.documentElement.style.setProperty('--accent-numb',        8);
			document.documentElement.style.setProperty('--correct-accent',  '33%');

			document.documentElement.style.setProperty('--correct-color-header',  '10%');
		}		

		if (this.settings.darkt == 0.04){
			
			document.documentElement.style.setProperty('--background_dark',  '#1c2226');  
			document.documentElement.style.setProperty('--f-color',                10);

			document.documentElement.style.setProperty('--accent-numb',        10);
			document.documentElement.style.setProperty('--correct-accent',  '40%');

			document.documentElement.style.setProperty('--correct-color-header',  '10%');

		}
		
		if (this.settings.darkt == 0.05){
			
			document.documentElement.style.setProperty('--background_dark', '#1d2128');  /*  светло синий 1e2529-198  1d2128-218 */ 
			document.documentElement.style.setProperty('--f-color',                11);

			document.documentElement.style.setProperty('--accent-numb',        11);
			document.documentElement.style.setProperty('--correct-accent',  '49%');

			document.documentElement.style.setProperty('--correct-color-header',  '00%');
		}

		if (this.settings.darkt == 0.06){
			
			document.documentElement.style.setProperty('--background_dark', '#202029');  /*  синий  1e2529-198  1d2128-218 */  
			document.documentElement.style.setProperty('--f-color',                12);

			document.documentElement.style.setProperty('--accent-numb',        11);
			document.documentElement.style.setProperty('--correct-accent',  '49%');

			document.documentElement.style.setProperty('--correct-color-header',  '0%');
		}

		if (this.settings.darkt == 0.07){
		
			document.documentElement.style.setProperty('--background_dark', '#261f20');  /*  красный   */  
			document.documentElement.style.setProperty('--f-color',                 0);

			document.documentElement.style.setProperty('--accent-numb',         17.8);
			document.documentElement.style.setProperty('--correct-accent',  '56%');   /*  42  */ 

			document.documentElement.style.setProperty('--correct-color-header',  '5%');
		}


		if (this.settings.darkt == 0.08){

			document.documentElement.style.setProperty('--background_dark',    '#fcf5e4');  /* 2a241d */ 
			document.documentElement.style.setProperty('--flag_Light',            '100%');
			document.documentElement.style.setProperty('--text-muted-dark',       '#333');
			document.documentElement.style.setProperty('--text-color-tabs-dark',  '#555');

			this.setFont_Calibri_Dark();
		}	
		
		
	
		
		if(this.settings.RGBcorrection == 0.01) document.documentElement.style.setProperty('--global-soft-color-dark', '#ffa200');	
		if(this.settings.RGBcorrection == 0.02) document.documentElement.style.setProperty('--global-soft-color-dark', '#66a200');	
		if(this.settings.RGBcorrection == 0.03) document.documentElement.style.setProperty('--global-soft-color-dark', '#5959ff');

		if (this.settings.softL) document.documentElement.style.setProperty('--global-soft-color-light', '#ffa200');	// ffa200
		else                     document.documentElement.style.setProperty('--global-soft-color-light', '#66a200');	// ffa200
		
		
		if (this.settings.wide_text){
					
			if (this.settings.serifswitch) document.documentElement.style.setProperty('--letter-spacing-light', '0.15px');
			else                           document.documentElement.style.setProperty('--letter-spacing-light', '0.05px');

			document.documentElement.style.setProperty('--letter-spacing-dark',  '0.05px');
		}
		else{  

			document.documentElement.style.setProperty('--letter-spacing-light', '0.00px');
			document.documentElement.style.setProperty('--letter-spacing-dark',  '0.00px');
		}


		

		if (this.settings.colorheaders) {
					
			document.documentElement.style.setProperty('--soft-hard-header',     '1');   /* 0 soft          1 hard */
			document.documentElement.style.setProperty('--header-raduga',       '100%');   /* 0% одноцветный  100% радуга */
			document.documentElement.style.setProperty('--default-header',      '0%');   /* 0% цветной      100% черно-белый */
		
			if (this.settings.darkt == 0.01) document.documentElement.style.setProperty('--header-gray', '100%');
		}
		else{

			document.documentElement.style.setProperty('--soft-hard-header',     '1');   /* 0 soft          1 hard */
			document.documentElement.style.setProperty('--header-raduga',       '0%');   /* 0% одноцветный  100% радуга */
			document.documentElement.style.setProperty('--default-header',      '0%');   /* 0% цветной      100% черно-белый */

			if (this.settings.darkt == 0.01) document.documentElement.style.setProperty('--header-gray', '0%');
		}                     


		if (this.settings.lighthed) document.documentElement.style.setProperty('--default-header-l',  '0%');
		else                        document.documentElement.style.setProperty('--default-header-l',  '100%');

	}


	onunload() {

	}


	
	
	changeSizetext = (newValue: number = 0.1) => {
		this.settings.sizetext = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}

	changePowercorrection = (newValue: number = 0.1) => {
		this.settings.powercorrection = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}	

	changePowercorrection_d = (newValue: number = 0.1) => {
		this.settings.powercorrection_d = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}	

	changeFresh_dark = (newValue: number = 0.1) => {
		this.settings.fresh_dark = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}	


	changeRGBcorrection = (newValue: number = 0.1) => {
		this.settings.RGBcorrection = newValue;
		/*this.css.innerText = `body{--zen-opacity: ${newValue};}`;*/
		// save the new settings
		this.saveData(this.settings);
	}	

	changeDarkT = (newValue: number = 0.25) => {
		this.settings.darkt = newValue;
		this.saveData(this.settings);
	}

	
	enableAccentPlus = () => {
		// add the class
		document.body.classList.add('accent-pluss');
	}
	
	disableAccentPlus = () => {
		// remove the class
		document.body.classList.remove('accent-pluss');
	}

	toggleAccentPlus = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.accentplus;
		// assign the new value and call the correct enable / disable function
		(this.settings.accentplus = newValue)
		  ? this.enableAccentPlus() : this.disableAccentPlus();
		// save the new settings
		this.saveData(this.settings);
	}



	enableWide_text = () => {
		// add the class
		document.body.classList.add('wide-text');
	}
	
	disableWide_text = () => {
		// remove the class
		document.body.classList.remove('wide-text');
	}

	toggleWide_text = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.wide_text;
		// assign the new value and call the correct enable / disable function
		(this.settings.wide_text = newValue)
		  ? this.enableWide_text() : this.disableWide_text();
		// save the new settings
		this.saveData(this.settings);
	}




	enableColorheaders = () => {
		// add the class
		document.body.classList.add('color-headers-c');
	}
	
	disableColorheaders = () => {
		// remove the class
		document.body.classList.remove('color-headers-c');
	}

	toggleColorheaders = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.colorheaders;
		// assign the new value and call the correct enable / disable function
		(this.settings.colorheaders = newValue)
		  ? this.enableColorheaders() : this.disableColorheaders();
		// save the new settings
		this.saveData(this.settings);
	}


	enablesoftL = () => {
		// add the class
		document.body.classList.add('soft-L');
	}
	
	disablesoftL = () => {
		// remove the class
		document.body.classList.remove('soft-L');
	}

	togglesoftL = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.softL;
		// assign the new value and call the correct enable / disable function
		(this.settings.softL = newValue)
		  ? this.enablesoftL() : this.disablesoftL();
		// save the new settings
		this.saveData(this.settings);
	}


	enableSoftdark = () => {
		// add the class
		document.body.classList.add('soft-dark');
	}
	
	disableSoftdark = () => {
		// remove the class
		document.body.classList.remove('soft-dark');
	}

	toggleSoftdark = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.softdark;
		// assign the new value and call the correct enable / disable function
		(this.settings.softdark = newValue)
		  ? this.enableSoftdark() : this.disableSoftdark();
		// save the new settings
		this.saveData(this.settings);
	}





	enableSdarkt = () => {
		// add the class
		document.body.classList.add('soft-dark-t');
	}
	
	disableSdarkt = () => {
		// remove the class
		document.body.classList.remove('soft-dark-t');
	}

	toggleSdarkt = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.sdarkt;
		// assign the new value and call the correct enable / disable function
		(this.settings.sdarkt = newValue)
		  ? this.enableSdarkt() : this.disableSdarkt();
		// save the new settings
		this.saveData(this.settings);
	}

	enableSlarkt = () => {
		// add the class
		document.body.classList.add('soft-lark-t');
	}
	
	disableSlarkt = () => {
		// remove the class
		document.body.classList.remove('soft-lark-t');
	}

	toggleSlarkt = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.slarkt;
		// assign the new value and call the correct enable / disable function
		(this.settings.slarkt = newValue)
		  ? this.enableSlarkt() : this.disableSlarkt();
		// save the new settings
		this.saveData(this.settings);
	}




	enableSpacing_paragraphs = () => {
		// add the class
		document.body.classList.add('spacing-paragraphs');
	}
	
	disableSpacing_paragraphs = () => {
		// remove the class
		document.body.classList.remove('spacing-paragraphs');
	}

	toggleSpacing_paragraphs = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.spacing_paragraphs;
		// assign the new value and call the correct enable / disable function
		(this.settings.spacing_paragraphs = newValue)
		  ? this.enableSpacing_paragraphs() : this.disableSpacing_paragraphs();
		// save the new settings
		this.saveData(this.settings);
	  }


	enableSerifswitch = () => {
		// add the class
		document.body.classList.add('accent-pluss');
	}
	disableSerifswitch = () => {
		// remove the class
		document.body.classList.remove('accent-pluss');
	}

	toggleSerifswitch = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.serifswitch;
		// assign the new value and call the correct enable / disable function
		(this.settings.serifswitch = newValue)
		  ? this.enableSerifswitch() : this.disableSerifswitch();
		// save the new settings
		this.saveData(this.settings);
	}


	enableJustified = () => {
		// add the class
		document.body.classList.add('justified-text');
	}
	disableJustified = () => {
		// remove the class
		document.body.classList.remove('justified-text');
	}

	toggleJustified = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.justified;
		// assign the new value and call the correct enable / disable function
		(this.settings.justified = newValue)
		  ? this.enableJustified() : this.disableJustified();
		// save the new settings
		this.saveData(this.settings);
	}



	enableLighthed = () => {
		// add the class
		document.body.classList.add('light-hed');
	}
	
	disableLighthed = () => {
		// remove the class
		document.body.classList.remove('light-hed');
	}

	toggleLighthed = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.lighthed;
		// assign the new value and call the correct enable / disable function
		(this.settings.lighthed = newValue)
		  ? this.enableLighthed() : this.disableLighthed();
		// save the new settings
		this.saveData(this.settings);
	}


	enableNeonheaders = () => {
		// add the class
		document.body.classList.add('neon-headers');
	}
	
	disableNeonheaders = () => {
		// remove the class
		document.body.classList.remove('neon-headers');
	}

	toggleNeonheaders = (newValue: boolean = null) => {
		// if no value is passed in, toggle the existing value
		if (newValue === null) newValue = !this.settings.neonheaders;
		// assign the new value and call the correct enable / disable function
		(this.settings.neonheaders = newValue)
		  ? this.enableNeonheaders() : this.disableNeonheaders();
		// save the new settings
		this.saveData(this.settings);
	}








	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}


class ProtonTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h3', {
			text: 'Dark Theme',  /*Customization*/
		  });

		
		new Setting(containerEl)
		.setName("Color")
		//.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(1, 7, 1)
			.setValue(this.plugin.settings.darkt * 100)
			.onChange((newValue) => { this.plugin.changeDarkT(newValue / 100) 
			this.plugin.saveSettings();
			

			this.plugin.setFont_SegoeUI_Dark();

			if (this.plugin.settings.serifswitch) this.plugin.setFont_Merri_Light();
			else                                  this.plugin.setFont_Calibri_Light(); 

			document.documentElement.style.setProperty('--color-text-light',   '#333333');  /* 0d0d0d  */ 
			document.documentElement.style.setProperty('--text-muted-light',      '#333');
			document.documentElement.style.setProperty('--text-color-tabs-light', '#555');

			document.documentElement.style.setProperty('--text-muted-dark',       '#888');
			document.documentElement.style.setProperty('--text-color-tabs-dark',  '#aaa');
            document.documentElement.style.setProperty('--flag_Light',              '0%');

			document.documentElement.style.setProperty('--f-gray',           '1');  //  1-цветной   0-серый
			
			document.documentElement.style.setProperty('--accent-color-f',  '1');
			

			if (this.plugin.settings.softdark){

				document.documentElement.style.setProperty('--color-text-dark-p',  '#7a766d');
				document.documentElement.style.setProperty('--accent-color-f',       '0');
			}
			else{
					document.documentElement.style.setProperty('--color-text-dark-p',  '#919191');
					document.documentElement.style.setProperty('--accent-color-f',     '1');
			}

			document.documentElement.style.setProperty('--header-gray',  '100%');


			if (this.plugin.settings.darkt == 0.01){
					
				document.documentElement.style.setProperty('--background_dark', '#212121');  
				document.documentElement.style.setProperty('--f-gray', '0'); 
				

				document.documentElement.style.setProperty('--color-text-dark-p',  '#919191');
				document.documentElement.style.setProperty('--accent-color-f',  '0');

				document.documentElement.style.setProperty('--correct-color-header',  "0%"); // 0
				
				if(this.plugin.settings.colorheaders) document.documentElement.style.setProperty('--header-gray', '100%');
				else                                  document.documentElement.style.setProperty('--header-gray', '0%');
				
                /*
				document.documentElement.style.setProperty('--f-gray', '0'); 

				document.documentElement.style.setProperty('--background_dark', '#212121');   
				document.documentElement.style.setProperty('--f-color',                2);

				document.documentElement.style.setProperty('--accent-numb',        3);
				document.documentElement.style.setProperty('--correct-accent',  '32%');

				

				document.documentElement.style.setProperty('--correct-color-header',  "25%"); // 15
                */				
			}

			if (this.plugin.settings.darkt == 0.02){
				
				document.documentElement.style.setProperty('--background_dark', '#211f1b');  /*  желтый  */  
				document.documentElement.style.setProperty('--f-color',                2);

				document.documentElement.style.setProperty('--accent-numb',        3);
				document.documentElement.style.setProperty('--correct-accent',  '32%');

				document.documentElement.style.setProperty('--correct-color-header',  "15%");
			}	

			if (this.plugin.settings.darkt == 0.03){
				
				document.documentElement.style.setProperty('--background_dark', '#1b2120');  /*  зеленый  */  
				document.documentElement.style.setProperty('--f-color',                8);

				document.documentElement.style.setProperty('--accent-numb',        8);
				document.documentElement.style.setProperty('--correct-accent',  '33%');

				document.documentElement.style.setProperty('--correct-color-header',  '10%');
			}		

			if (this.plugin.settings.darkt == 0.04){
				
				document.documentElement.style.setProperty('--background_dark',  '#1c2226');  
				document.documentElement.style.setProperty('--f-color',                10);

				document.documentElement.style.setProperty('--accent-numb',        10);
				document.documentElement.style.setProperty('--correct-accent',  '40%');

				document.documentElement.style.setProperty('--correct-color-header',  '10%');

			}
			
			if (this.plugin.settings.darkt == 0.05){
				
				document.documentElement.style.setProperty('--background_dark', '#1d2128');  /*  светло синий 1e2529-198  1d2128-218 */ 
				document.documentElement.style.setProperty('--f-color',                11);

				document.documentElement.style.setProperty('--accent-numb',        11);
				document.documentElement.style.setProperty('--correct-accent',  '49%');

				document.documentElement.style.setProperty('--correct-color-header',  '00%');
			}
	
			if (this.plugin.settings.darkt == 0.06){
				
				document.documentElement.style.setProperty('--background_dark', '#202029');  /*  синий  1e2529-198  1d2128-218 */  
				document.documentElement.style.setProperty('--f-color',                12);

				document.documentElement.style.setProperty('--accent-numb',        11);
				document.documentElement.style.setProperty('--correct-accent',  '49%');

				document.documentElement.style.setProperty('--correct-color-header',  '0%');
			}

			if (this.plugin.settings.darkt == 0.07){
			
				document.documentElement.style.setProperty('--background_dark', '#261f20');  /*  красный   */  
				document.documentElement.style.setProperty('--f-color',                 0);

				document.documentElement.style.setProperty('--accent-numb',         17.8);
				document.documentElement.style.setProperty('--correct-accent',  '56%');   /*  42  */ 

				document.documentElement.style.setProperty('--correct-color-header',  '5%');
			}
	



			if (this.plugin.settings.darkt == 0.08){

				document.documentElement.style.setProperty('--background_dark',    '#fcf5e4');  /* 2a241d */ 
				document.documentElement.style.setProperty('--flag_Light',            '100%');
				document.documentElement.style.setProperty('--text-muted-dark',       '#333');
				document.documentElement.style.setProperty('--text-color-tabs-dark',  '#555');

				this.plugin.setFont_Calibri_Dark();
			}	
			

			if(this.plugin.settings.darkt == 0.08) document.documentElement.style.setProperty('--color-text-dark-p',  'fcf5e4');


			console.log(newValue/100);

		})
		);	

		new Setting(containerEl)
		.setName("Power Correction")
		//.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(0, 10, 2.5)
		  .setValue(this.plugin.settings.powercorrection_d * 100)
		  .onChange((newValue) => { this.plugin.changePowercorrection_d(newValue / 100)  
			
				document.documentElement.style.setProperty('--persent-soft-p-dark', this.plugin.settings.powercorrection_d * 100);

			console.log(this.plugin.settings.powercorrection_d * 100);
			})
		);	


		new Setting(containerEl)
		.setName("R - G - B Correction")
		//.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(1, 3, 1)
		  .setValue(this.plugin.settings.RGBcorrection * 100)
		  .onChange((newValue) => { this.plugin.changeRGBcorrection(newValue / 100)  
			
		  if(this.plugin.settings.RGBcorrection == 0.01) document.documentElement.style.setProperty('--global-soft-color-dark', '#ffa200');	// ffa200
		  if(this.plugin.settings.RGBcorrection == 0.02) document.documentElement.style.setProperty('--global-soft-color-dark', '#66a200');	
		  if(this.plugin.settings.RGBcorrection == 0.03) document.documentElement.style.setProperty('--global-soft-color-dark', '#5959ff');	
		  
		  //document.documentElement.style.setProperty('--persent-soft-p', this.plugin.settings.RGBcorrection * 100);


		   console.log(this.plugin.settings.RGBcorrection);
		   })
		);			







		new Setting(containerEl)
		.setName("Text")
		//.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(20, 80, 10)
		  .setValue(this.plugin.settings.fresh_dark * 100)
		  .onChange((newValue) => { this.plugin.changeFresh_dark(newValue / 100)  
			
				document.documentElement.style.setProperty('--fresh_dark-text', this.plugin.settings.fresh_dark * 100);

			console.log(this.plugin.settings.fresh_dark);
			})
		);	



/*
		new Setting(containerEl)
			.setName('Soft')
			
			.addToggle(toggle => toggle.setValue(this.plugin.settings.softdark)

			.onChange((newValue) => {

				this.plugin.toggleSoftdark(newValue) 

				if (this.plugin.settings.softdark){

						document.documentElement.style.setProperty('--color-text-dark-p',  '#7a766d');
						document.documentElement.style.setProperty('--accent-color-f',       '0');
				}
				else{
					    document.documentElement.style.setProperty('--color-text-dark-p',  '#919191');
						document.documentElement.style.setProperty('--accent-color-f',  '1');
				}
				console.log(this.plugin.settings.softdark);
			}) 
		);		
*/

		new Setting(containerEl)
			.setName('Accent')
			/*.setDesc('Hides word count, character count and backlink count.')*/
			.addToggle(toggle => toggle.setValue(this.plugin.settings.accentplus)

			.onChange((newValue) => {

				this.plugin.toggleAccentPlus(newValue) 

				if (this.plugin.settings.accentplus) document.documentElement.style.setProperty('--accent-plus',  '100%');
				else                                 document.documentElement.style.setProperty('--accent-plus',  '0%');
			
				console.log(this.plugin.settings.accentplus);
			}) 
		);


		new Setting(containerEl)
			.setName('Headers')
			/*.setDesc('Hides word count, character count and backlink count.')*/
			.addToggle(toggle => toggle.setValue(this.plugin.settings.colorheaders)

			.onChange((newValue) => {

				this.plugin.toggleColorheaders(newValue) 

				if (this.plugin.settings.colorheaders) {
					
					document.documentElement.style.setProperty('--soft-hard-header',     '1');   /* 0 soft          1 hard */
					document.documentElement.style.setProperty('--header-raduga',       '100%');   /* 0% одноцветный  100% радуга */
					document.documentElement.style.setProperty('--default-header',      '0%');   /* 0% цветной      100% черно-белый */
				
					if (this.plugin.settings.darkt == 0.01) document.documentElement.style.setProperty('--header-gray', '100%');
				}
				else{

					document.documentElement.style.setProperty('--soft-hard-header',     '1');   /* 0 soft          1 hard */
					document.documentElement.style.setProperty('--header-raduga',       '0%');   /* 0% одноцветный  100% радуга */
					document.documentElement.style.setProperty('--default-header',      '0%');   /* 0% цветной      100% черно-белый */

					if (this.plugin.settings.darkt == 0.01) document.documentElement.style.setProperty('--header-gray', '0%');
				}                                   
			
				console.log(this.plugin.settings.colorheaders);
			}) 
		);





		containerEl.createEl('h3', {
			text: 'Light Theme',  
		  });



		new Setting(containerEl)
		.setName("Background")
		//.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
			slider.setLimits(0, 10, 2.5)
			.setValue(this.plugin.settings.powercorrection * 100)
			.onChange((newValue) => { this.plugin.changePowercorrection(newValue / 100)  
			
				document.documentElement.style.setProperty('--persent-soft-p', this.plugin.settings.powercorrection * 100);

			console.log(this.plugin.settings.powercorrection * 100);
			})
		);	

		new Setting(containerEl)
		  .setName('Soft')
		  /*.setDesc('Serif Font only for Light Theme.')*/
		  .addToggle(toggle => toggle.setValue(this.plugin.settings.softL)

		  .onChange((newValue) => {

			  this.plugin.togglesoftL(newValue) 
			  
			  if (this.plugin.settings.softL) document.documentElement.style.setProperty('--global-soft-color-light', '#ffa200');	// ffa200
			  else                            document.documentElement.style.setProperty('--global-soft-color-light', '#66a200');	// ffa200
			  
			  console.log(this.plugin.settings.softL);
		  }) 
	    );	

		new Setting(containerEl)
			.setName('Serif')
			//.setDesc('Serif Font only for Light Theme.')
			.addToggle(toggle => toggle.setValue(this.plugin.settings.serifswitch)

			.onChange((newValue) => {

				this.plugin.toggleSerifswitch(newValue) 
				 
				if (this.plugin.settings.serifswitch) this.plugin.setFont_Merri_Light();
				else                                  this.plugin.setFont_Calibri_Light(); 
			   

				if (this.plugin.settings.wide_text){
					
					if (this.plugin.settings.serifswitch) document.documentElement.style.setProperty('--letter-spacing-light', '0.15px');
					else                                  document.documentElement.style.setProperty('--letter-spacing-light', '0.05px');

					document.documentElement.style.setProperty('--letter-spacing-dark',  '0.05px');
				}
				else{  

					document.documentElement.style.setProperty('--letter-spacing-light', '0.00px');
					document.documentElement.style.setProperty('--letter-spacing-dark',  '0.00px');
				}


				console.log(this.plugin.settings.serifswitch);
			}) 
		);		

		new Setting(containerEl)
		.setName('Headers')
		/*.setDesc('Hides word count, character count and backlink count.')*/
		.addToggle(toggle => toggle.setValue(this.plugin.settings.lighthed)

		.onChange((newValue) => {

			this.plugin.toggleLighthed(newValue) 

			if (this.plugin.settings.lighthed) document.documentElement.style.setProperty('--default-header-l',  '0%');
			else                               document.documentElement.style.setProperty('--default-header-l',  '100%');
		
			console.log(this.plugin.settings.lighthed);
		}) 
	    );



		containerEl.createEl('h3', {
			text: 'Text',  
		  });

		
		new Setting(containerEl)
		.setName("Size")
		//.setDesc("The opacity of unfocused lines in zen mode")
		.addSlider(slider =>
		  slider.setLimits(0.6, 5, 0.10)  // 3.6
		  .setValue(this.plugin.settings.sizetext * 100)
		  .onChange((newValue) => { this.plugin.changeSizetext(newValue / 100)  
			
				document.documentElement.style.setProperty('--set-font-size', newValue);

			console.log(newValue);
			})
		);	
/*
		new Setting(containerEl)
		.setName('Wide')
		.addToggle(toggle => toggle.setValue(this.plugin.settings.wide_text)

		.onChange((newValue) => {

			this.plugin.toggleWide_text(newValue) 
			
			if (this.plugin.settings.wide_text){
				
				if (this.plugin.settings.serifswitch) document.documentElement.style.setProperty('--letter-spacing-light', '0.15px');
				else                                  document.documentElement.style.setProperty('--letter-spacing-light', '0.05px');

				document.documentElement.style.setProperty('--letter-spacing-dark',  '0.05px');
			}
			else{  

				document.documentElement.style.setProperty('--letter-spacing-light', '0.00px');
				document.documentElement.style.setProperty('--letter-spacing-dark',  '0.00px');
			}

			console.log(this.plugin.settings.wide_text);
		    }) 
	    );	
*/
		new Setting(containerEl)
			.setName('Word Mod')
			/*.setDesc('Serif Font only for Light Theme.')*/
			.addToggle(toggle => toggle.setValue(this.plugin.settings.spacing_paragraphs)

			.onChange((newValue) => {

				this.plugin.toggleSpacing_paragraphs(newValue) 
				
				if (this.plugin.settings.spacing_paragraphs) document.documentElement.style.setProperty('--word-mode', '1');
				else                                         document.documentElement.style.setProperty('--word-mode', '0');

				if (this.plugin.settings.spacing_paragraphs) document.documentElement.style.setProperty('--padding-wm', '55px');
				else                                         document.documentElement.style.setProperty('--padding-wm', '32px');
			    
				console.log(this.plugin.settings.spacing_paragraphs);
			}) 
		);		



		new Setting(containerEl)
			.setName('Justified')
			/*.setDesc('Serif Font only for Light Theme.')*/
			.addToggle(toggle => toggle.setValue(this.plugin.settings.justified)

			.onChange((newValue) => {

				this.plugin.toggleJustified(newValue) 
				
				if (this.plugin.settings.justified) document.documentElement.style.setProperty('--text-align-k', 'justify');
				else                                document.documentElement.style.setProperty('--text-align-k', 'left');
			    
				console.log(this.plugin.settings.justified);
			}) 
		);	
		
		



	}
}



