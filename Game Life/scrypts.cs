using CefSharp;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game_Life
{
    internal class ScryptCS
    {
        ChromiumWebBrowser browser;
        public event EventHandler ExitHandler;
        public ScryptCS(ChromiumWebBrowser browser)
        {
            this.browser = browser;
        }
        public void showDevtools()
        {
            browser.ShowDevTools();
        }
        public void close()
        {
            ExitHandler.Invoke(null, EventArgs.Empty);
        }
    }
}
