using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game_Life
{
    internal static class UpdateMap
    {
        static Random rand = new Random();
        static int[][] map;
        public static void SetMap(int[][] arr)
        {
            map = arr;
        }
        public static int[][] GetMap()
        {
            int random = rand.Next(0, 10);
            int random1 = rand.Next(0, 10);
            map[random][random1] = 1;
            return map;
        }
    }
}
