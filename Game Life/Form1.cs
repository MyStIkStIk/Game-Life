using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;

namespace Game_Life
{
    public partial class Form1 : Form
    {
        ChromiumWebBrowser chromium;
        public Form1()
        {
            InitializeComponent();
            InitBrowser();
            ScryptCS scryptReg = new ScryptCS(chromium);
            scryptReg.ExitHandler += Exit;
            CefSharpSettings.WcfEnabled = true;
            chromium.JavascriptObjectRepository.Settings.LegacyBindingEnabled = true;
            chromium.JavascriptObjectRepository.Register("scryptCS", scryptReg, isAsync: false, options: BindingOptions.DefaultBinder);
        }

        private void Exit(object sender, EventArgs e)
        {
            this.Invoke(new Action(() => this.Close()));
        }

        public void InitBrowser()
        {
            CefSettings settings = new CefSettings();
            Cef.Initialize(settings);

            string path = string.Format(@"{0}\htmlPage\index\menu.html", Environment.CurrentDirectory);
            chromium = new ChromiumWebBrowser(path);

            this.Controls.Add(chromium);
            chromium.Dock = DockStyle.Fill;
        }
        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }
    }
}
