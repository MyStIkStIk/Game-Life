using CefSharp;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Game_Life
{
    internal class ScryptCS
    {
        ChromiumWebBrowser browser;
        public event EventHandler ExitHandler;
        public static MapSize size = new MapSize();
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
        public void setMapSize(int x, int y)
        {
            size.X = x;
            size.Y = y;
        }
        public string getMapSize()
        {
            return JsonConvert.SerializeObject(size);
        }
        public void updateMap(int[][] map)
        {
            UpdateMap.SetMap(map);
        }
        public string SendMap(int[][] map)
        {
            return JsonConvert.SerializeObject(UpdateMap.GetMap());
        }
    }
    class MapSize
    {
        public int X { get; set; } = 10;
        public int Y { get; set; } = 10;
        public int Cell { get; set; } = 20;
    }
}
