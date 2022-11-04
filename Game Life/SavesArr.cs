using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Game_Life
{
    public static class SavesArr
    {
        public static void AddSave(string name, string arr)
        {
            if (!Directory.Exists(Application.StartupPath + "\\Saves"))
            {
                Directory.CreateDirectory(Application.StartupPath + "\\Saves");
            }
            FileStream stream = new FileStream(Application.StartupPath + "\\Saves\\" + name + ".txt", FileMode.Create, FileAccess.Write);
            StreamWriter writer = new StreamWriter(stream);
            writer.Write(arr);
            writer.Close();
            stream.Close();
        }
        public static string[] GetSaves()
        {
            string[] arr = Directory.GetFiles(Application.StartupPath + "\\Saves");
            for (int i = 0; i < arr.Length; i++)
            {
                arr[i] = Path.GetFileName(arr[i]).Replace(".txt", "");
            };
            return arr;
        }
        public static string GetSave(string name)
        {
            string namee = name.Replace(" ", "");
            FileStream stream = new FileStream(Application.StartupPath + "\\Saves\\" + namee + ".txt", FileMode.Open, FileAccess.Read);
            StreamReader reader = new StreamReader(stream);
            string str = reader.ReadToEnd();
            reader.Close();
            stream.Close();
            return str;
        }
        public static void Delete(string name)
        {
            string res = name.Replace(" ", "");
            File.Delete(Application.StartupPath + "\\Saves\\" + res + ".txt");
        }
    }
}
