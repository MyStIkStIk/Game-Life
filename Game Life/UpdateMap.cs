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
        static List<(int, int, int)> list = new List<(int, int, int)>();
        static int[][] map;
        public static void SetMap(int[][] arr)
        {
            map = arr;
            for (int i = 0; i < map.Length; i++)
            {
                for (int j = 0; j < map[i].Length; j++)
                {
                    if (map[i][j] != 0)
                    {
                        map[i][j] = 1;
                    }
                }
            }
        }
        public static int[][] GetMap()
        {
            UpdateLifeSlots();
            for (int i = 0; i < map.Length; i++)
            {
                for (int j = 0; j < map[i].Length; j++)
                {
                    if (map[i][j] == 2)
                        map[i][j] = 1;
                }
            }
            return map;
        }
        static void UpdateLifeSlots()
        {
            for (int i = 0; i < map.Length; i++)
            {
                for (int j = 0; j < map[i].Length; j++)
                {
                    if ((i > 0 & j > 0) & (i < map.Length - 1 & j < map[i].Length - 1))
                    {
                        list.Add((i - 1, j - 1, map[i - 1][j - 1]));
                        list.Add((i, j - 1, map[i][j - 1]));
                        list.Add((i + 1, j - 1, map[i + 1][j - 1]));

                        list.Add((i - 1, j, map[i - 1][j]));
                        list.Add((i, j, map[i][j]));
                        list.Add((i + 1, j, map[i + 1][j]));

                        list.Add((i - 1, j + 1, map[i - 1][j + 1]));
                        list.Add((i, j + 1, map[i][j + 1]));
                        list.Add((i + 1, j + 1, map[i + 1][j + 1]));
                        MakeChoise(list, i, j);
                        list.Clear();
                    }
                    if (i == 0)
                    {
                        if (j == 0)
                        {
                            list.Add((i, j, map[i][j]));
                            list.Add((i + 1, j, map[i + 1][j]));

                            list.Add((i, j + 1, map[i][j + 1]));
                            list.Add((i + 1, j + 1, map[i + 1][j + 1]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else if (j == map[i].Length - 1)
                        {
                            list.Add((i, j - 1, map[i][j - 1]));
                            list.Add((i + 1, j - 1, map[i + 1][j - 1]));

                            list.Add((i, j, map[i][j]));
                            list.Add((i + 1, j, map[i + 1][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else
                        {
                            list.Add((i, j - 1, map[i][j - 1]));
                            list.Add((i, j + 1, map[i][j + 1]));
                            list.Add((i, j, map[i][j]));
                            list.Add((i + 1, j - 1, map[i + 1][j - 1]));
                            list.Add((i + 1, j + 1, map[i + 1][j + 1]));
                            list.Add((i + 1, j, map[i + 1][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                    }
                    else if (j == 0)
                    {
                        if (i == 0)
                        {
                            list.Add((i, j, map[i][j]));
                            list.Add((i + 1, j, map[i + 1][j]));

                            list.Add((i, j + 1, map[i][j + 1]));
                            list.Add((i + 1, j + 1, map[i + 1][j + 1]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else if (i == map.Length - 1)
                        {
                            list.Add((i - 1, j, map[i - 1][j]));
                            list.Add((i, j, map[i][j]));

                            list.Add((i - 1, j + 1, map[i - 1][j + 1]));
                            list.Add((i, j + 1, map[i][j + 1]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else
                        {
                            list.Add((i - 1, j, map[i - 1][j]));
                            list.Add((i + 1, j, map[i + 1][j]));
                            list.Add((i, j, map[i][j]));

                            list.Add((i - 1, j + 1, map[i - 1][j + 1]));
                            list.Add((i + 1, j + 1, map[i + 1][j + 1]));
                            list.Add((i, j + 1, map[i][j + 1]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                    }
                    if (i == map.Length - 1)
                    {
                        if (j == 0)
                        {

                            list.Add((i - 1, j, map[i - 1][j]));
                            list.Add((i, j, map[i][j]));

                            list.Add((i - 1, j + 1, map[i - 1][j + 1]));
                            list.Add((i, j + 1, map[i][j + 1]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else if (j == map[i].Length - 1)
                        {
                            list.Add((i - 1, j - 1, map[i - 1][j - 1]));
                            list.Add((i, j - 1, map[i][j - 1]));

                            list.Add((i - 1, j, map[i - 1][j]));
                            list.Add((i, j, map[i][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else
                        {
                            list.Add((i, j - 1, map[i][j - 1]));
                            list.Add((i, j + 1, map[i][j + 1]));
                            list.Add((i, j, map[i][j]));

                            list.Add((i - 1, j - 1, map[i - 1][j - 1]));
                            list.Add((i - 1, j + 1, map[i - 1][j + 1]));
                            list.Add((i - 1, j, map[i - 1][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                    }
                    else if (j == map[i].Length - 1)
                    {
                        if (i == 0)
                        {
                            list.Add((i, j - 1, map[i][j - 1]));
                            list.Add((i + 1, j - 1, map[i + 1][j - 1]));

                            list.Add((i, j, map[i][j]));
                            list.Add((i + 1, j, map[i + 1][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else if (i == map.Length - 1)
                        {
                            list.Add((i - 1, j - 1, map[i - 1][j - 1]));
                            list.Add((i, j - 1, map[i][j - 1]));

                            list.Add((i - 1, j, map[i - 1][j]));
                            list.Add((i, j, map[i][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                        else
                        {
                            list.Add((i - 1, j - 1, map[i - 1][j - 1]));
                            list.Add((i + 1, j - 1, map[i + 1][j - 1]));
                            list.Add((i, j - 1, map[i][j - 1]));

                            list.Add((i - 1, j, map[i - 1][j]));
                            list.Add((i + 1, j, map[i + 1][j]));
                            list.Add((i, j, map[i][j]));

                            MakeChoise(list, i, j);
                            list.Clear();
                        }
                    }
                }
            }
        }
        static void MakeChoise(List<(int, int, int)> list, int i, int j)
        {
            //List<(int, int, int)> lifeList = new List<(int, int, int)>();
            //List<(int, int, int)> noLifeList = new List<(int, int, int)>();
            int lifeList = 0;
            int noLifeList = 0;
            foreach (var item in list)
            {
                if (item.Item3 == 1)
                {
                    //lifeList.Add(item);
                    lifeList++;
                }
                else if (item.Item3 == 0)
                {
                    //noLifeList.Add(item);
                    noLifeList++;
                }
            }
            if ((lifeList == 3) && map[i][j] == 0)
                map[i][j] = 2;
            if ((lifeList < 3 || lifeList > 4) && map[i][j] == 1)
            {
                map[i][j] = 0;
            }
        }
    }
}
